<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Paiement\PaiementController;
use App\Http\Controllers\Api\Reservation\ReservationController;
use App\Http\Controllers\Api\Utilisateurs\AdminController;
use App\Http\Controllers\Api\Utilisateurs\ClientController;
use App\Http\Controllers\Api\Utilisateurs\UserController;
use App\Http\Controllers\Api\Voiture\VoitureController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

/**
 * Les parties entre guillements doivent etre complété par les méthodes
 * des controllers associées
*/
//
