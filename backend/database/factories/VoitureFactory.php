<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voiture>
 */
class VoitureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'car_name' => $this->faker->company, // ou word() si tu préfères un nom simple
            'car_model' => $this->faker->word,
            'car_categorie' => $this->faker->randomElement(['citadine', 'SUV', 'berline', 'cabriolet']),
            'immatriculation' => strtoupper($this->faker->bothify('??-####-??')), // ex: AB-1234-CD
            'statut' => $this->faker->randomElement(['reservé', 'disponible', 'loué']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
