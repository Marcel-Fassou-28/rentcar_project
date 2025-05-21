<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UtilisateurFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail(),
            'role' => $this->faker->randomElement(['admin', 'client']),
            'password' => password_hash($this->faker->password, PASSWORD_BCRYPT),
            'birthday' => $this->faker->date('Y-m-d', '-18 years'),
            'adresse' => $this->faker->address,
            'telephone' => $this->faker->phoneNumber(),
            'photo' => $this->faker->imageUrl(200, 200, 'people'),
            'email_verified_at' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
            'created_at' => now(),
            'updated_at' => now(),
            'token' => Str::random(60),
        ];
    }
}

