<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Http\Requests\VoitureRequest;
use Illuminate\Support\Facades\Storage;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        $query = Voiture::select(
            'id',
            'car_name',
            'car_model',
            'car_categorie',
            'price',
            'statut',
            'car_photo'
        );
        if ($category) {
            $query->where('car_categorie', $category);
        }
        $voitures = $query->get();

        if ($voitures->isNotEmpty()) {
            foreach ($voitures as $voiture) {
                $photoUrl = $voiture->car_photo && Storage::disk('public')->exists('voitures/' . $voiture->car_photo)
                    ? url('storage/voitures/' . $voiture->car_photo)
                    : null;
                $voiture->car_photo = $photoUrl;
            }
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
