<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Http\Requests\VoitureRequest;
use Illuminate\Http\JsonResponse;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $voitures = Voiture::select(
            'id', 
            'car_name', 
            'car_model', 
            'car_categorie', 
            'statut', 
            'car_photo'
        )
            ->get()
            ->groupBy('car_categorie');

        if ($voitures) {
            return response()->json([
                'success' => true,
                'data' => $voitures
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'data' => []
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VoitureRequest $request)
    {
        // 
        

        try {
        $voiture = new Voiture();
        $voiture->car_name = $request->car_name;
        $voiture->immatriculation = $request->immatriculation;
        $voiture->car_model = $request->car_model;
        $voiture->car_categorie = $request->car_categorie;
        $voiture->price = $request->price;
        $voiture->statut = $request->statut;
        $voiture->transmission = $request->transmission;
        $voiture->moteur = $request->moteur;
        $voiture->car_photo = $request->car_photo;



        $voiture->save();

        return response()->json(['message' => 'Voiture ajoutée avec succès !'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
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
        $voiture = Voiture::select('id', 'car_name', 'car_model', 'car_categorie', 'immatriculation', 'statut', 'transmission', 'moteur', 'price', 'car_photo')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $voiture
        ], 200);
    }
}
