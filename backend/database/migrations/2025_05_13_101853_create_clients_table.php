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
        Schema::create('clients', function (Blueprint $table) {
            $table->id('idClient');
            $table->string('telephone');
            $table->string('permis_conduire')->nullable();
            $table->timestamps();

            $table->foreignId('client_user_id')
                ->unique() // <== garantit 0 ou 1 paiement par réservation
                ->nullable()
                ->constrained('utilisateurs', 'idUser')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
