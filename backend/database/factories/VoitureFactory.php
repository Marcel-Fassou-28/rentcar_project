<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voiture>
 */
class VoitureFactory extends Factory
{



     protected $carBrands = [
        'BMW' => [
            'Série 3' => ['berline', 'luxe'],
            'X5' => ['SUV', 'luxe'],
            'X3' => ['SUV'],
            'Série 1' => ['compact'],
            'M4' => ['berline', 'luxe']
        ],
        'Mercedes' => [
            'Classe C' => ['berline', 'luxe'],
            'GLC' => ['SUV', 'luxe'],
            'Classe A' => ['compact'],
            'AMG GT' => ['berline', 'luxe'],
            'GLE' => ['SUV', 'luxe']
        ],
        'Audi' => [
            'A3' => ['compact'],
            'A4' => ['berline'],
            'Q5' => ['SUV'],
            'RS6' => ['berline', 'luxe'],
            'Q7' => ['SUV', 'luxe']
        ],
        'Toyota' => [
            'Yaris' => ['citadine'],
            'Corolla' => ['berline'],
            'RAV4' => ['SUV'],
            'Land Cruiser' => ['4x4'],
            'CH-R' => ['SUV']
        ],
        'Honda' => [
            'Civic' => ['compact'],
            'CR-V' => ['SUV'],
            'Jazz' => ['citadine'],
            'HR-V' => ['SUV'],
            'e:Ny1' => ['SUV', 'electrique']
        ]
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

         $brand = $this->faker->randomElement(array_keys($this->carBrands));
        $model = $this->faker->randomElement(array_keys($this->carBrands[$brand]));
        $categorie = $this->faker->randomElement($this->carBrands[$brand][$model]);


        return [
            'car_name' => $brand.'-'.$model, // ou word() si tu préfères un nom simple
            'car_model' => $model,
            'car_categorie' => $this->faker->randomElement($this->carBrands[$brand][$model]),
            'immatriculation' => strtoupper($this->faker->bothify('??-####-??')), // ex: AB-1234-CD
            'statut' => $this->faker->randomElement(['reservé', 'disponible', 'loué']),
            'car_photo' => sprintf(
                "https://cdn.imagin.studio/getimage?customer=img&make=%s&modelFamily=%s",
                $brand,
                str_replace(' ', '-', $model)
            ),
            'moteur' => $this->faker->randomElement(['essence', 'diesel', 'hybride', 'electrique']),
            'price' => $this->faker->randomFloat(0, 100, 3000),
            'transmission' => $this->faker->randomElement(['automatique', 'manuelle']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
