<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id('idVoiture');
            $table->string('car_name');
            $table->string('car_model');
            $table->string('car_categorie');
            $table->string('immatriculation')->unique();
            $table->enum('statut', ['reservé', 'disponible', 'loué']);
            $table->string('car_photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};
