<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition(): array
    {
        // Crée un utilisateur avec rôle 'client'
        $utilisateur = Utilisateur::factory()->create([
            'role' => 'client',
        ]);

        return [
            'id' => $utilisateur->id,
            'telephone' => $this->faker->phoneNumber,
            'permisConduire' => $this->faker->optional()->bothify('??######'),
        ];
    }
}
