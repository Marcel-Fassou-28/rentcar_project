<?php

namespace Database\Seeders;

use App\Models\Administrateur;
use App\Models\Client;
use App\Models\User;
use App\Models\Utilisateur;
use App\Models\Voiture;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         
        Client::truncate();
        Administrateur::truncate();
        Utilisateur::truncate();
        Voiture::truncate();
        
        Client::factory()->count(30)->create();
        Administrateur::factory()->count(20)->create();
        Voiture::factory()->count(50)->create();
    }
}