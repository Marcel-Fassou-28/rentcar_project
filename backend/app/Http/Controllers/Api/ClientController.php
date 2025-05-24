<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;


use App\Http\Requests\UpdateProfileRequest;
use App\Models\Utilisateur;
use App\Models\Client;
use App\Http\Requests\UserRequest;
use App\Models\Paiement;
use App\Models\Reservation;
use App\Models\Voiture;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            // Récupérer les clients avec pagination
            $clients = Utilisateur::where('role', 'client')
                ->paginate(10); // 10 clients par page, ajustable

            // Vérifier si des clients existent
            if ($clients->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Aucun client trouvé.',
                    'data' => []
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data' => $clients->items(), // Retourne uniquement les éléments de la page
                'pagination' => [
                    'total' => $clients->total(),
                    'per_page' => $clients->perPage(),
                    'current_page' => $clients->currentPage(),
                    'last_page' => $clients->lastPage(),
                ]
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des clients: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la récupération des clients.'
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        // Créer l'utilisateur
        $utilisateur = Utilisateur::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'role' => 'client',
            'password' => Hash::make($validated['password']),
            'birthay' => $validated['birthday'], // Note : 'birthday' dans UserRequest, 'birthay' dans la table
            'adresse' => $validated['adresse'],
            'telephone' => $validated['telephone'],
            'photo' => $validated['photo'] ?? null, // Photo non incluse dans UserRequest, donc facultative
        ]);

        // Créer l'entrée dans la table clients (permisConduire facultatif)
        $utilisateur->client()->create([
            'permisConduire' => $request->input('permisConduire') ?? null,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Client créé avec succès',
            'data' => [
                'id' => $utilisateur->id,
                'nom' => $utilisateur->nom,
                'prenom' => $utilisateur->prenom,
                'email' => $utilisateur->email,
                'birthay' => $utilisateur->birthday,
                'adresse' => $utilisateur->adresse,
                'telephone' => $utilisateur->telephone,
                'photo' => $utilisateur->photo,
                'permisConduire' => $utilisateur->client->permisConduire,
            ]
        ], 201);
    }

    public function reservationClient() {

        $clients = Utilisateur::select(
            'utilisateurs.id', 
            'utilisateurs.nom', 
            'utilisateurs.prenom', 
            'utilisateurs.email', 
            'utilisateurs.birthday', 
            'utilisateurs.adresse', 
            'utilisateurs.telephone') //'clients.permisConduire')
            ->join('clients', 'utilisateurs.id', '=', 'clients.id')
            ->join('reservations', 'clients.id', '=', 'reservations.idClient')
            ->where('utilisateurs.role', 'client')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $clients
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Utilisateur::select('utilisateurs.id', 'nom', 'prenom', 'email', 'birthday', 'adresse', 'telephone', 'photo')
            ->join('clients', 'utilisateurs.id', '=', 'clients.id')
            ->where('utilisateurs.id', $id)
            ->where('role', 'client')
            ->groupBy('utilisateurs.id')
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
            ->firstOrFail();
        
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $utilisateur = Utilisateur::where('id', $id)
            ->where('role', 'client')
            ->first();

        if($utilisateur) {
            if ($utilisateur->photo && Storage::disk('public')->exists('profil/' . $utilisateur->photo) && $utilisateur->photo != 'avatar.png') {
                Storage::disk('public')->delete('profil/' . $utilisateur->photo);
            }
            $utilisateur->delete();
            return response()->json([
                'success' => true,
                'message' => 'Client supprimé avec succès'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Opération avec erreur'
        ], 200);
    }

    /**
     * Show the specified ressource for the dashboard
     */
    public function dashboard($id)
    {
        // Vérifier si le client existe et correspond au nom
        $client = Utilisateur::where('id', $id)
            ->where('role', 'client')
            ->first();

        if (!$client) {
            return response()->json(['message' => 'Client introuvable.'], 404);
        }

        $clientId = $client->id;
        $totalReservations = Reservation::where('idClient', $clientId)->count();
        $reservationsParStatut = Reservation::where('idClient', $clientId)
            ->select('statut', DB::raw('COUNT(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        $reservationsParMois = Reservation::where('idClient', $clientId)
            ->where('created_at', '>=', Carbon::now()->subMonths(12))
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as mois'),
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        $totalPaiements = Paiement::whereHas('reservation', function ($query) use ($clientId) {
            $query->where('idClient', $clientId);
        })->sum('montant');

        $paiementsParMois = Paiement::whereHas('reservation', function ($query) use ($clientId) {
                $query->where('idClient', $clientId);
            })
            ->where('datePaiement', '>=', Carbon::now()->subMonths(12))
            ->select(
                DB::raw('DATE_FORMAT(datePaiement, "%Y-%m") as mois'),
                DB::raw('SUM(montant) as total')
            )
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();
        
            $voitureTotal = Reservation::where('idClient', $clientId)->select('idVoiture')->count();

        return response()->json([
            'success' => true,
            'client' => [
                'id' => $client->id,
                'nom' => ucwords(strtolower($client->nom)),
                'prenom' => ucwords(strtolower($client->prenom)),
                'email' => $client->email,
            ],
            'reservations' => [
                'total' => $totalReservations,
                'par_statut' => $reservationsParStatut,
                'par_mois' => $reservationsParMois,
            ],
            'paiements' => [
                'total' => $totalPaiements,
                'par_mois' => $paiementsParMois,
            ],
            'totalVoiture' => $voitureTotal,
        ]);
    }
}