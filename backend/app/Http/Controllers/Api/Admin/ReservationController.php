<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\Voiture;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::with(['client', 'voiture'])->get();
    }

    public function store(ReservationRequest $request)
    {
        $reservation = Reservation::create($request->validated());
        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        $reservation = Reservation::with(['client', 'voiture'])->find($id);
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }
        return $reservation;
    }

    public function update(Request $etat,$id)
    {
        $reservation = Reservation::find($id, );

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }
        $voiture = Voiture::find($reservation->idVoiture);
        if (!$voiture) {
            return response()->json(['message' => 'Voiture not found'], 404);
        }

        if ($etat->statut === "accept") {
            $reservation->update(['statut' => 'en cours']);
            $voiture->update(['statut' => 'reservé']);
        } else if ($etat->statut === "refuse") {
            $reservation->update(['statut' => 'expiré']);
            $voiture->update(['statut' => 'disponible']);
        } else if ($etat->statut === "payer") {
            $reservation->update(['statut' => 'payé']);
            $voiture->update(['statut' => 'loué']); 
        }

        return response()->json([$reservation, $voiture], 200);
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }
        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted']);
    }
}