<?php

namespace Database\Factories;
use App\Models\Administrateur;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdministrateurFactory extends Factory
{
    protected $model = Administrateur::class;

    public function definition(): array
    {
        // Crée un utilisateur avec rôle 'admin'
        $utilisateur = Utilisateur::factory()->create([
            'role' => 'admin',
        ]);

        return [
            'id' => $utilisateur->id,
        ];
    }
}
