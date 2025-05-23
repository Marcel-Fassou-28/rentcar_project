<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use App\Models\Administrateur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\AdminRequest;
use App\Models\Paiement;
use App\Models\Reservation;
use App\Models\Voiture;
use Carbon\Carbon;
use Illuminate\Http\Request;
 use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Utilisateur::where('role', 'admin')->get();
        return response()->json($admins);
    }
    // Créer un admin
    public function store(AdminRequest $request)
    {
        $user = Utilisateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birthay' => $request->birthay,
            'adresse' => $request->adresse,
            'telephone' => $request->telephone,
            'photo' => $request->file('photo')->store('photos', 'public'),
            'role' => 'admin',
            'token' => Str::random(60),
        ]);

        Administrateur::create(['id' => $user->id]);

        return response()->json([
            'message' => 'Administrateur créé avec succès.',
            'data' => $user
        ], 201);
    }

    // Voir un administrateur
    public function show(string $id)
    {
        $admin = Utilisateur::where('id', $id)->where('role', 'admin')->first();

        if (!$admin) {
            return response()->json(['message' => 'Administrateur introuvable.'], 404);
        }

        return response()->json($admin);
    }

    // Modifier un administrateur
    public function update(AdminRequest $request, string $id)
    {
        $admin = Utilisateur::where('id', $id)->where('role', 'admin')->first();

        if (!$admin) {
            return response()->json(['message' => 'Administrateur introuvable.'], 404);
        }

        $admin->update([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'birthay' => $request->birthay,
            'adresse' => $request->adresse,
            'telephone' => $request->telephone,
        ]);

        if ($request->filled('password')) {
            $admin->update(['password' => Hash::make($request->password)]);
        }

        if ($request->hasFile('photo')) {
            if ($admin->photo && Storage::disk('public')->exists($admin->photo)) {
                Storage::disk('public')->delete($admin->photo);
            }
            $admin->update(['photo' => $request->file('photo')->store('photos', 'public')]);
        }

        return response()->json(['message' => 'Administrateur mis à jour.', 'data' => $admin]);
    }

    // Supprimer un administrateur
    public function destroy(string $id)
    {
        $admin = Utilisateur::where('id', $id)->where('role', 'admin')->first();

        if (!$admin) {
            return response()->json(['message' => 'Administrateur introuvable.'], 404);
        }

        $admin->delete();

        return response()->json(['message' => 'Administrateur supprimé.']);
    }

    // Récupérer les infos du profil connecté (utilisateur actuel)
    public function profil(Request $request)
    {
        $admin = $request->user();

        if (!$admin || $admin->role !== 'admin') {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        return response()->json($admin);
    }


    public function dashboard()
    {
        // Total utilisateurs
        $totalUtilisateurs = Utilisateur::count();
        $utilisateursConnectes = Utilisateur::whereNotNull('token')->count();

        // Réservations par statut
        $reservationsParStatut = Reservation::select('statut', DB::raw('COUNT(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        // Réservations par mois (12 derniers mois)
        $reservationsParMois = Reservation::select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as mois'),
                DB::raw('COUNT(*) as total')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(12))
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        // Voitures par statut
        $totalVoitures = Voiture::count();
        $voituresParStatut = Voiture::select('statut', DB::raw('COUNT(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        // Paiements par mois (12 derniers mois)
        $paiementsParMois = Paiement::select(
                DB::raw('DATE_FORMAT(datePaiement, "%Y-%m") as mois'),
                DB::raw('SUM(montant) as total')
            )
            ->where('datePaiement', '>=', Carbon::now()->subMonths(12))
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        // Somme totale de tous les paiements
        $sommeTotalePaiements = Paiement::sum('montant');

        return response()->json([
            'utilisateurs' => [
                'total' => $totalUtilisateurs,
                'connectes' => $utilisateursConnectes,
            ],
            'reservations' => [
                'total' => $reservationsParStatut->sum(),
                'par_statut' => $reservationsParStatut,
                'par_mois' => $reservationsParMois,
            ],
            'voitures' => [
                'total' => $totalVoitures,
                'par_statut' => $voituresParStatut,
            ],
            'paiements' => [
                'total' => $sommeTotalePaiements,
                'par_mois' => $paiementsParMois,
            ],
        ]);
    }
}
