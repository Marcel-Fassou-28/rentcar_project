<?php

use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Api\Admin\VoitureController;
use App\Http\Controllers\Api\VoitureController as ApiVoitureController;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\Api\ClientController;

use App\Http\Controllers\Api\ReservationController;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::aliasMiddleware('role', \App\Http\Middleware\RoleMiddleware::class);

/*
|-------------------------------------------------------------------
|  Public
|-------------------------------------------------------------------
*/
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/ressources', [UserController::class, 'home']); // Pour certaine information de l'accueil
Route::get('/voitures', [ApiVoitureController::class, 'index']); // Pour les models de voiture

Route::post('/email', [UserController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('/reset', [UserController::class, 'reset'])->name('password.reset');

Route::get('/auth/google', [UserController::class, 'redirectToGoogle'])->name('google.login');
Route::get('/auth/google/callback', [UserController::class, 'handleGoogleCallback']);

/*
|------------------------------------------------------------------
| Client seulement
|------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum','role:client'])->group(function () {
    Route::get('/user/dashboard/{id}/{name}', [ClientController::class, 'dashboard']);

    /** Pour gérer le profil */
    Route::prefix('user/profil')->group(function() {
        Route::get('/{id}', [ClientController::class, 'show']);
        Route::patch('/update/{id}', [ClientController::class, 'update']);
    });

    /** Pour les reservations */
    Route::prefix('user/reservations')->group(function() {
        Route::get('/my', [ReservationController::class, 'index']);
        Route::post('/my', [ReservationController::class, 'store']);
        Route::patch('/my/{id}', [ReservationController::class, 'update']);
        Route::delete('/my/{id}', [ReservationController::class, 'destroy']);
        Route::get('/my/{id}', [ReservationController::class, 'show']);
    });

});

/*
|------------------------------------------------------------------
| Admin seulement
|------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum','role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    
    /** Pour gérer le profil */
    Route::prefix('admin/profil')->group(function() {
        Route::get('/{id}', [AdminController::class, 'profil']);
        Route::patch('/update/{id}', [AdminController::class, 'update']);
    });

    /** 
     * Gestion des réservations 
     */
    Route::prefix('admin/reservations')->group(function () {
        Route::get('/', [AdminReservationController::class, 'index']);
        Route::post('/add', [AdminReservationController::class, 'store']);
        Route::patch('/update/{id}', [AdminReservationController::class, 'update']);
        Route::delete('/delete/{id}', [AdminReservationController::class, 'destroy']);
        Route::get('/detail/{id}', [AdminReservationController::class, 'show']);
    });

    /**
     * Gestion des utilisateurs
     */
   
    Route::prefix('admin/users')->group(function () {
        Route::get('/reservation',   [ClientController::class, 'reservationClient']);
        Route::get('/',   [ClientController::class, 'index']);
        Route::delete('/delete/{id}',  [ClientController::class, 'destroy']);
        Route::get('/show/{id}',   [ClientController::class, 'show']);
    });

    /**
     * Gestion des Voitures
     */
    Route::prefix('admin/voitures')->group(function () {
        Route::get('/', [VoitureController::class, 'index']);
        Route::post('/add', [VoitureController::class, 'store']);
        Route::patch('/update/{id}', [VoitureController::class, 'update']);
        Route::delete('/delete/{id}', [VoitureController::class, 'destroy']);
        Route::get('/show/{id}', [VoitureController::class, 'show']);
    });

});

Route::middleware('auth:api')->post('/logout', [UserController::class, 'logout'])->name('api.logout');