<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Utilisateur;
use App\Models\Client;
use App\Http\Requests\UserRequest;
use App\Models\Paiement;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Utilisateur::select('utilisateurs.id', 'nom', 'prenom', 'email', 'birthday', 'adresse', 'telephone','created_at', 'photo','clients.permisConduire')
            //->join('clients', 'utilisateurs.id', '=', 'clients.id')
            ->where('role', 'client')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $clients
        ], 200);
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
                'birthay' => $utilisateur->birthay,
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
        $client = Utilisateur::select('utilisateurs.id', 'nom', 'prenom', 'email', 'birthday', 'adresse', 'clients.telephone', 'photo', 'clients.permisConduire')
            ->join('clients', 'utilisateurs.id', '=', 'clients.id')
            ->where('utilisateurs.id', $id)
            ->where('role', 'client')
            ->groupBy('utilisateurs.id')
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $client
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $validated = $request->validated();

        // Trouver l'utilisateur
        $utilisateur = Utilisateur::where('id', $id)
            ->where('role', 'client')
            ->firstOrFail();

        // Mettre à jour l'utilisateur
        $utilisateur->update([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => isset($validated['password']) ? Hash::make($validated['password']) : $utilisateur->password,
            'birthay' => $validated['birthday'],
            'adresse' => $validated['adresse'],
            'telephone' => $validated['telephone'],
            'photo' => $validated['photo'] ?? $utilisateur->photo,
        ]);

        // Mettre à jour l'entrée dans la table clients
        $utilisateur->client()->update([
            'permisConduire' => $request->input('permisConduire') ?? $utilisateur->client->permisConduire,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Client mis à jour avec succès',
            'data' => [
                'id' => $utilisateur->id,
                'nom' => $utilisateur->nom,
                'prenom' => $utilisateur->prenom,
                'email' => $utilisateur->email,
                'birthay' => $utilisateur->birthay,
                'adresse' => $utilisateur->adresse,
                'telephone' => $utilisateur->telephone,
                'photo' => $utilisateur->photo,
                'permisConduire' => $utilisateur->client->permisConduire,
            ]
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $utilisateur = Utilisateur::where('id', $id)
            ->where('role', 'client')
            ->firstOrFail();

        $utilisateur->delete(); // Supprime l'utilisateur et l'entrée client via ON DELETE CASCADE

        return response()->json([
            'status' => 'success',
            'message' => 'Client supprimé avec succès'
        ], 200);
    }

    /**
     * Show the specified ressource for the dashboard
     */
    public function dashboard($id, $nom)
    {
        // Vérifier si le client existe et correspond au nom
        $client = Utilisateur::where('id', $id)
            ->where('nom', $nom)
            ->where('role', 'client')
            ->first();

        if (!$client) {
            return response()->json(['message' => 'Client introuvable.'], 404);
        }

        // ID du client (clé étrangère dans la table `reservations`)
        $clientId = $client->id;

        // Nombre total de réservations du client
        $totalReservations = Reservation::where('idClient', $clientId)->count();

        // Réservations par statut
        $reservationsParStatut = Reservation::where('idClient', $clientId)
            ->select('statut', DB::raw('COUNT(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        // Réservations par mois (12 derniers mois)
        $reservationsParMois = Reservation::where('idClient', $clientId)
            ->where('created_at', '>=', Carbon::now()->subMonths(12))
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as mois'),
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        // Total des paiements
        $totalPaiements = Paiement::whereHas('reservation', function ($query) use ($clientId) {
            $query->where('idClient', $clientId);
        })->sum('montant');

        // Paiements par mois (12 derniers mois)
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

        return response()->json([
            'client' => [
                'id' => $client->id,
                'nom' => $client->nom,
                'prenom' => $client->prenom,
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
            ]
        ]);
    }
}