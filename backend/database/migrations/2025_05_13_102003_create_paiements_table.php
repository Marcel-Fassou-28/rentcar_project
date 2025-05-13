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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id('idPaiement');
            $table->timestamp('datePaiement');
            $table->double('montant');
            $table->enum('methode_paiement', ['carte']);
            $table->timestamps();

            // Clé étrangère vers paiement
            $table->foreignId('reservation_id')
                ->unique() // <== garantit 0 ou 1 paiement par réservation
                ->nullable()
                ->constrained('reservations', 'idReservation')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
