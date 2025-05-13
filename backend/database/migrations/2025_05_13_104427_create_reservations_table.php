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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('idReservation');
            $table->date('dateDebut');
            $table->date('dateFin');
            $table->enum('statut', ['payé','expiré', 'en cours', 'en attente']);
            $table->double('montant_total');
            $table->timestamps();

            // Clé étrangère vers client
            $table->foreignId('reservation_client_id')
                ->nullable()
                ->constrained('clients', 'idClient')
                ->onDelete('set null');

            // Clé étrangère vers administrateur
            $table->foreignId('reservation_admin_id')
                ->nullable()
                ->constrained('administrateurs', 'idAdmin')
                ->onDelete('set null');

            // Clé étrangère vers voiture (unique = une seule réservation à la fois)
            $table->foreignId('reservation_voiture_id')
                ->nullable()
                ->unique()
                ->constrained('voitures', 'idVoiture')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
