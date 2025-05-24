<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    // Afficher uniquement les réservations du client connecté
    public function index()
    {
        $clientId = Auth::id(); // ou auth()->user()->id selon config
        $reservations = Reservation::with(['voiture'])
            ->where('idClient', $clientId)
            ->get();

        return response()->json($reservations);
    }

    // Créer une nouvelle réservation pour le client connecté
    public function store(ReservationRequest $request){
    $validated = $request->validated();

    $validated['idClient'] = Auth::id(); // Le client connecté
    $validated['statut'] = 'en attente'; // Ajoute le statut automatiquement

    $reservation = Reservation::create($validated);

    return response()->json($reservation, 201);
}



    // Afficher une seule réservation si elle appartient au client connecté
    public function show($id)
    {
        $reservation = Reservation::with('voiture')->find($id);

        if (!$reservation || $reservation->idClient !== Auth::id()) {
            return response()->json(['message' => 'Réservation non trouvée ou accès interdit'], 404);
        }

        return response()->json($reservation);
    }

    // Mise à jour si la réservation appartient au client
    public function update(ReservationRequest $request, $id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation || $reservation->idClient !== Auth::id()) {
            return response()->json(['message' => 'Réservation non trouvée ou accès interdit'], 404);
        }

        $reservation->update($request->validated());
        return response()->json($reservation);
    }

    public function annuler($id)
    {
    $reservation = Reservation::find($id);

    if (!$reservation || $reservation->idClient !== Auth::id()) {
        return response()->json(['message' => 'Réservation non trouvée ou accès interdit'], 404);
    }

    $reservation->statut = 'annulée';
    $reservation->save();

    return response()->json(['message' => 'Réservation annulée avec succès.']);
}



    // Suppression si la réservation appartient au client
    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation || $reservation->idClient !== Auth::id()) {
            return response()->json(['message' => 'Réservation non trouvée ou accès interdit'], 404);
        }

        $reservation->delete();
        return response()->json(['message' => 'Réservation supprimée avec succès']);
    }
}
