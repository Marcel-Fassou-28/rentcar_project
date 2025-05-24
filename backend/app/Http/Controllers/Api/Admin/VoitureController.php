<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateVoitureRequest;
use App\Models\Voiture;
use Illuminate\Http\Request;
use App\Http\Requests\VoitureRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $category = $request->query('category');
        $query = Voiture::select(
            'id',
            'car_name',
            'car_model',
            'car_categorie',
            'statut',
            'car_photo'
        );
        if ($category) {
            $query->where('car_categorie', $category);
        }
        $voitures = $query->get()->groupBy('car_categorie');
        if ($voitures->isNotEmpty()) {
            foreach ($voitures as $categorie => $voitureGroup) {
                foreach ($voitureGroup as $voiture) {
                    $photoUrl = $voiture->car_photo && Storage::disk('public')->exists('voitures/' . $voiture->car_photo)
                        ? url('storage/voitures/' . $voiture->car_photo)
                        : null;
                    $voiture->car_photo = $photoUrl;
                }
            }
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
        try {
            $validated = $request->validated();
            
            if ($request->has('car_photo') && $request->car_photo['name'] && $request->car_photo['data']) {
                $photoData = $request->car_photo['data'];
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

                if (strlen($imageData) > 5 * 1024 * 1024) {
                    return response()->json([
                        'message' => 'L\'image ne doit pas dépasser 2 Mo.',
                    ], 422);
                };

                $fileName = 'voiture_' . time() . '_' . Str::random(16) . '.' . pathinfo(pathinfo($request->car_photo['name'], PATHINFO_BASENAME), PATHINFO_EXTENSION);
                $filePath = 'voitures/' . $fileName;
                Storage::disk('public')->put($filePath, $imageData);
            }

            $voiture = Voiture::create([
                'car_name' => $validated['car_name'],
                'immatriculation' => $validated['immatriculation'],
                'car_model' => $validated['car_model'],
                'car_categorie' => $validated['car_categorie'],
                'price' => $validated['price'],
                'statut' => 'disponible',
                'transmission' => $validated['transmission'],
                'moteur' => $validated['moteur'],
                'car_photo' => $fileName ?: null,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Voiture ajoutée avec succès',
                'data' => $voiture,
            ], 201);   
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoitureRequest $request, string $id)
    {
        try {
            $validated = $request->validated();
        $voiture = Voiture::where('id', $id)
            ->first();

        
        if ($request->has('car_photo') && $request->car_photo['name'] && $request->car_photo['data']) {
            $photoData = $request->car_photo['data'];
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

            if (strlen($imageData) > 5 * 1024 * 1024) {
                return response()->json([
                    'message' => 'L\'image ne doit pas dépasser 2 Mo.',
                ], 422);
            };

            $fileName = 'voiture_' . time() . '_' . Str::random(16) . '.' . pathinfo(pathinfo($request->car_photo['name'], PATHINFO_BASENAME), PATHINFO_EXTENSION);
            $filePath = 'voitures/' . $fileName;
            ;
            Storage::disk('public')->put($filePath, $imageData);
            if ($voiture->car_photo && Storage::disk('public')->exists('profil/' . $voiture->car_photo) && $voiture->photo != 'car.jpeg') {
                Storage::disk('public')->delete('profil/' . $voiture->car_photo);
            }
        }

        $voiture->update([
            'car_name' => $validated['car_name'],
            'immatriculation' => $validated['immatriculation'],
            'car_model' => $validated['car_model'],
            'car_categorie' => $validated['car_categorie'],
            'price' => $validated['price'],
            'statut' => 'disponible',
            'transmission' => $validated['transmission'],
            'moteur' => $validated['moteur'],
            'car_photo' => $fileName ?? $voiture->car_photo,
        ]);

        $voiture = Voiture::where('id', $id)
            ->first();
        $photoUrl = $voiture->car_photo && Storage::disk('public')->exists('voitures/' . $voiture->car_photo)
            ? url('storage/voitures/' . $voiture->car_photo)
            : null;
        $voiture->car_photo = $photoUrl;
        
        return response()->json([
            'success' => true,
            'message' => 'Voiture mise à jour avec succès',
            'data' => $voiture
        ], 200);
        } catch(\Exception $e) {
            Log::info($e->getMessage());
            return response()->json([
                'success' => false,
            'message' => $e->getMessage()
            ], 200);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $voiture = Voiture::find($id);
        if ($voiture) {
            if ($voiture->photo && Storage::disk('public')->exists('voitures/' . $voiture->photo) && $voiture->photo != 'car.jpeg') {
                Storage::disk('public')->delete('voitures/' . $voiture->photo);
            }
            $voiture->delete();
            return response()->json([
                'success' => true,
                'message' => 'Voiture supprimée avec succès'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Impossible de supprimer'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $voiture = Voiture::select('id', 'car_name', 'car_model', 'car_categorie', 'immatriculation', 
            'statut', 'transmission', 'moteur', 'price', 'car_photo')
            ->find($id);
        
        if ($voiture) {
            $photoUrl = $voiture->car_photo && Storage::disk('public')->exists('voitures/' . $voiture->car_photo)
                ? url('storage/voitures/' . $voiture->car_photo)
                : null;
            $voiture->car_photo = $photoUrl;

            return response()->json([
                'success' => true,
                'data' => $voiture
            ], 200);
        }
        return response()->json([
            'success' => true,
            'message' => 'Erreur lors de la récupération du fichier'
        ], 404);
    }
}
