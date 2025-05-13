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
        Schema::create('administrateurs', function (Blueprint $table) {
            $table->id('idAdmin');
            $table->timestamps();

            $table->foreignId('admin_user_id')
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
        Schema::dropIfExists('administrateurs');
    }
};
