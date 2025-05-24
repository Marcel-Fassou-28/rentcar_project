<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UserRequest;
use App\Models\Client;
use App\Models\Note;
use App\Models\Utilisateur;
use App\Notifications\WelcomeNotification;
use Exception;
use Google_Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    /**
     * Inscription d’un nouvel utilisateur.
     */
    public function register(UserRequest $request): JsonResponse
    {
        
        try {
            $user = $request->validated();
            $user['password'] = Hash::make($user['password']);

            $user = Utilisateur::create($user);
            $user->notify(new WelcomeNotification($user));

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur créé avec succès.',
                'utilisateur'    => $user,
            
            ], 201);

        } catch(Exception $e) {
            return response()->json($e);
        }
        
    }

    /**
     * Connexion d’un utilisateur.
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = Auth::user();
            $photoUrl = $user->photo && Storage::disk('public')->exists('profil/' . $user->photo)
            ? url('storage/profil/' . $user->photo)
            : null;
            $user->photo = $photoUrl;
            $token = $user->createToken('MA_CLEE_SECRETE')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie.',
                'user'    => $user,
                'token' => $token,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Identifiants incorrects.',
            ], 401);
        }   
    }

    public function logout(Request $request)
    {
        try {
            $user = Auth::guard('api')->user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Revoke the current token
            $request->user()->currentAccessToken()->delete();

            // Optional: Revoke all tokens for the user
            $request->user()->tokens()->delete();
            return response()->json(['message' => 'Successfully logged out'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Logout failed'], 500);
        }
    }
 
    /**
     * Pour afficher certaines statistiques à l'accueil
     */
    public function home()
    {
        $totalUtilisateurs = Utilisateur::count();
        $totalNotes = Note::count();
        $totalCommentaires = Note::whereNotNull('commentaire')
            ->where('commentaire', '!=', '')
            ->count();

        $moyenneNotes = round(Note::avg('note') ?? 0, 1);

        return response()->json([
            'utilisateurs' => $totalUtilisateurs,
            'notes' => [
                'total' => $totalNotes,
                'commentaires' => $totalCommentaires,
                'moyenne' => $moyenneNotes,
            ],
        ], 200);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink($request->only('email'));
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true, 'message' => __($status)], 200)
            : response()->json(['success' => false, 'message' => __($status)], 422);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => bcrypt($password)])
                    ->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['success' => true, 'message' => __($status)], 200)
            : response()->json(['success' => false, 'message' => __($status)], 422);
    }

    /**
     * Télécharge et stocke la photo de profil Google localement.
     *
     * @param string|null $avatarUrl URL de la photo Google
     * @return string|null Nom du fichier stocké ou null si échec
     */
    public function downloadAndStoreProfilePhoto(?string $avatarUrl): ?string
    {
        if (!$avatarUrl) {
            return null;
        }

        try {
            $photoContent = @file_get_contents($avatarUrl);
            if ($photoContent === false) {
                Log::warning('Échec du téléchargement de la photo de profil Google pour l\'utilisateur: ');
                return null;
            }

            $extension = pathinfo(parse_url($avatarUrl, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
            $photoName = 'profil_google_'. time(). '_' . '_' . Str::random(20) . '.' . $extension;
            $photoPath = 'profil/' . $photoName;
            Storage::disk('public')->put($photoPath, $photoContent);
            return $photoName ?: 'avatar.png';
        } catch (Exception $e) {
            Log::error('Erreur lors du téléchargement de la photo de profil Google: ' . $e->getMessage());
            return null;
        }
    }


    public function handleGoogleCallback(Request $request)
    {
        try {
            $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
            $payload = $client->verifyIdToken($request->credential);

            if (!$payload) {
                return response()->json(['message' => 'Jeton Google invalide'], 401);
            }

            $googleId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'];
            $givenName = $payload['given_name'];
            $familyName = $payload['family_name'];
            $picture = $payload['picture'] ?? null;
            
            $user = Utilisateur::where('google_id', $googleId)->orWhere('email', $email)->first();

            if (!$user) {
                $user = Utilisateur::create([
                    'google_id' => $googleId,
                    'email' => $email,
                    'nom' => $familyName,
                    'prenom' => $givenName,
                    'password' => Hash::make(Str::random(20)), // Random password for non-Google logins
                    'photo' => downloadAndStoreProfilePhoto($picture),
                ]);
                $u = Utilisateur::where('google_id', $googleId)->orWhere('email', $email)->first();;
                Client::create([
                    'id' => $u->id,
                    'permisConduire' => '',
                ]);
                $user->notify(new WelcomeNotification($user));
            } else {
                $user->update([
                    'google_id' => $googleId,
                ]);
            }
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Google auth error: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de l\'authentification Google'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Utilisateur::select('utilisateurs.id', 'nom', 'prenom', 'telephone', 'birthday', 'photo', 'email', 'adresse')
            ->where('utilisateurs.id', $id)
            ->first();

        $photoUrl = $client->photo && Storage::disk('public')->exists('profil/' . $client->photo)
            ? url('storage/profil/' . $client->photo)
            : null;
        $client->photo = $photoUrl;

        return response()->json([
            'status' => 'success',
            'data' => $client
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, string $id)
    {
        $validated = $request->validated();
        $utilisateur = Utilisateur::where('id', $id)
            ->where('role', 'client')
            ->first();
        
        if ($request->has('photo') && $request->photo['name'] && $request->photo['data']) {
                $photoData = $request->photo['data'];
                if (!preg_match('/^data:image\/(jpeg|png|jpg);base64,(.+)$/', $photoData, $matches)) {
                    return response()->json([
                        'message' => 'Format d\'image invalide',
                    ], 422);
                }
                $mimeType = $matches[1]; 
                $base64Data = $matches[2]; 

                $imageData = base64_decode($base64Data);
                if ($imageData === false) {
                    return response()->json([
                        'message' => 'Erreur lors du décodage de l\'image',
                    ], 422);
                };

                if (strlen($imageData) > 2 * 1024 * 1024) {
                    return response()->json([
                        'message' => 'L\'image ne doit pas dépasser 2 Mo.',
                    ], 422);
                };

                $fileName = 'profil_' . time() . '_' . Str::random(16) . '.' . pathinfo(pathinfo($request->photo['name'], PATHINFO_BASENAME), PATHINFO_EXTENSION);
                $filePath = 'profil/' . $fileName;
                Storage::disk('public')->put($filePath, $imageData);
                if ($utilisateur->photo && Storage::disk('public')->exists('profil/' . $utilisateur->photo) && $utilisateur->photo != 'avatar.png') {
                    Storage::disk('public')->delete('profil/' . $utilisateur->photo);
                }
            }
        $utilisateur->update([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'birthay' => $validated['birthday'],
            'adresse' => $validated['adresse'],
            'telephone' => $validated['telephone'],
            'photo' => $fileName ?? $utilisateur->photo,
        ]);

        $utilisateur = Utilisateur::where('id', $id)
            ->where('role', 'client')
            ->firstOrFail();
        $photoUrl = $utilisateur->photo && Storage::disk('public')->exists('profil/' . $utilisateur->photo)
            ? url('storage/profil/' . $utilisateur->photo)
            : null;
        $utilisateur->photo = $photoUrl;
        return response()->json([
            'success' => true,
            'message' => 'Client mis à jour avec succès',
            'data' => $utilisateur,
        ], 200);
    }
}



