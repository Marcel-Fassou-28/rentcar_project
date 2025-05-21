<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\Note;
use App\Models\Utilisateur;
use App\Notifications\WelcomeNotification;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
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

    /**
     * Pour afficher les certaines informations générales sur le site
     * Commme le nombre d'utilisateurs qui nous font confiance
     * Les notes, etc...
     */
    public function all() {

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
     * Redirige vers Google pour l'authentification OAuth.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToGoogle(): RedirectResponse
    {
        Log::info('Redirection vers Google OAuth initiée');
        return Socialite::driver('google')
            ->stateless()
            ->with(['access_type' => 'offline', 'prompt' => 'consent'])
            ->redirect();
    }

    /**
     * Gère le callback Google pour connexion ou inscription.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            Log::info('Début du callback Google', ['query' => request()->query()]);
            $httpClient = new Client(['verify' => false]);
            Socialite::driver('google')->setHttpClient($httpClient);
            $googleUser = Socialite::driver('google')->stateless()->user();
            $googleUser = Socialite::driver('google')->stateless()->user();
            Log::info('Utilisateur Google récupéré', [
                'email' => $googleUser->email,
                'name' => $googleUser->name,
            ]);

            $user = Utilisateur::where('email', $googleUser->email)->first();

            if ($user) {
                Log::info('Utilisateur existant trouvé', ['email' => $user->email]);
                return $this->loginAndRedirect($user);
            }

            Log::info('Création d’un nouvel utilisateur', ['email' => $googleUser->email]);
            $user = Utilisateur::create([
                'nom' => $googleUser->user['family_name'] ?? 'N/A',
                'prenom' => $googleUser->user['given_name'] ?? 'N/A',
                'email' => $googleUser->email,
                'birthday' => null,
                'password' => bcrypt(Str::random(16)),
                'role' => 'client',
                'photo' => $this->downloadGoogleProfilePicture($googleUser->avatar),
                'telephone' => '0000000000'
            ]);

            Log::info('Utilisateur créé', ['email' => $user->email]);

            $user->notify(new WelcomeNotification($user));
            Log::info('Notification de bienvenue envoyée', ['email' => $user->email]);

            return $this->loginAndRedirect($user);
        } catch (\Exception $e) {
            Log::error('Erreur Google Auth', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'code' => $e->getCode(),
            ]);
            return redirect(config('app.frontend_url', 'http://localhost:5173') . '/login?error=' . urlencode('Échec de l\'authentification Google: ' . $e->getMessage()));
        }
    }

    /**
     * Connecte l'utilisateur et redirige vers la page intermédiaire pour stocker le token.
     *
     * @param  \App\Models\Utilisateur  $user
     * @return \Illuminate\Http\RedirectResponse
     */
    private function loginAndRedirect(Utilisateur $user): RedirectResponse
    {
        Auth::login($user);
        $photoUrl = $user->photo && Storage::disk('public')->exists('profil/' . $user->photo)
            ? url('storage/profil/' . $user->photo)
            : null;

        $token = $user->createToken('MA_CLEE_SECRET')->plainTextToken;
        Log::info('Utilisateur connecté et token créé', [
            'email' => $user->email,
            'role' => $user->role,
            'id' => $user->id,
        ]);

        // Générer le slug nom-prenom en minuscules
        $nameSlug = Str::slug(($user->nom ?? 'N/A') . '-' . ($user->prenom ?? 'N/A'), '-');

        // Rediriger vers la page intermédiaire store-token
        $storeTokenUrl = sprintf(
            '%s/store-token?token=%s&photo=%s&role=%s&id=%s&name=%s',
            config('app.frontend_url', 'http://localhost:5173'),
            urlencode($token),
            urlencode($photoUrl ?? ''),
            urlencode($user->role),
            urlencode($user->id),
            urlencode($nameSlug)
        );

        Log::info('Redirection vers store-token', ['url' => $storeTokenUrl]);
        return redirect($storeTokenUrl);
    }

    /**
     * Télécharge et enregistre la photo de profil Google.
     *
     * @param  string|null  $url
     * @return string|null
     */
    private function downloadGoogleProfilePicture(?string $url): ?string
    {
        if (!$url) {
            Log::warning('Aucune URL de photo fournie');
            return null;
        }

        try {
            $contents = @file_get_contents($url);
            if ($contents === false) {
                Log::warning('Échec du téléchargement de la photo Google', ['url' => $url]);
                return null;
            }

            $filename = 'google_' . uniqid() . '.jpg';
            Storage::disk('public')->put('profil/' . $filename, $contents);
            Log::info('Photo Google enregistrée', ['filename' => $filename]);
            return $filename;
        } catch (\Exception $e) {
            Log::error('Erreur lors du téléchargement de la photo Google', [
                'url' => $url,
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }
}



