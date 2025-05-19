<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Client;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Utilisateur::select('utilisateurs.id', 'nom', 'prenom', 'email', 'birthay', 'adresse', 'telephone', 'photo', 'clients.permisConduire')
            ->join('clients', 'utilisateurs.id', '=', 'clients.id')
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Utilisateur::select('utilisateurs.id', 'nom', 'prenom', 'email', 'birthay', 'adresse', 'telephone', 'photo', 'clients.permisConduire')
            ->join('clients', 'utilisateurs.id', '=', 'clients.id')
            ->where('utilisateurs.id', $id)
            ->where('role', 'client')
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
    public function dashboard(string $id, string $name) {
        
    }
}