<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Http\Requests\VoitureRequest;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voitures = Voiture::select(
            'id',
            'car_name',
            'car_model',
            'car_categorie',
            'price',
            'statut',
            'car_photo'
        )
            ->get();
        // ->groupBy('car_categorie');

        if ($voitures) {
            return response()->json([
                'success' => true,
                'data' => $voitures
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'data' => $voitures
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $voiture = Voiture::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Voiture créée avec succès',
            'data' => $voiture
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VoitureRequest $request, string $id)
    {
        $voiture = Voiture::findOrFail($id);
        $voiture->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Voiture mise à jour avec succès',
            'data' => $voiture
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $voiture = Voiture::findOrFail($id);
        $voiture->delete();

        return response()->json([
            'success' => true,
            'message' => 'Voiture supprimée avec succès'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $voiture = Voiture::select('id', 'car_name', 'car_model', 'car_categorie', 'immatriculation', 'statut', 'car_photo')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $voiture
        ], 200);
    }
}
