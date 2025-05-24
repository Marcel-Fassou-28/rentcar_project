<?php

use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Api\Admin\VoitureController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\VoitureController as ApiVoitureController;
use App\Http\Controllers\Api\UserController;



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

Route::get('/voitures', [ApiVoitureController::class, 'index']); // Pour les tous les models de voiture
 Route::get('voiture/disponible', [VoitureController::class, 'voitureDisponible']); //pour les models de voiture disponible pour une location

Route::post('/email', [UserController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('/reset', [UserController::class, 'reset'])->name('password.reset');

Route::post('/auth/google/callback', [UserController::class, 'handleGoogleCallback']);
Route::get('/verify-new-email/{token}', [ClientController::class, 'verifyNewEmail']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('user/profil')->group(function() {
        Route::get('/{id}', [UserController::class, 'show']);
        Route::patch('/update/{id}', [UserController::class, 'update']);
    });
});
/*
|------------------------------------------------------------------
| Client seulement
|------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum','role:client'])->group(function () {
    Route::get('/user/dashboard/{id}', [ClientController::class, 'dashboard']);
    Route::delete('/user/delete/{id}',  [ClientController::class, 'destroy']);

    /** Pour les reservations */
    Route::prefix('user/reservations')->group(function() {
        Route::get('/my', [ReservationController::class, 'index']);
        Route::post('/my', [ReservationController::class, 'store']);
        Route::patch('/my/{id}', [ReservationController::class, 'update']);
        Route::delete('/my/{id}', [ReservationController::class, 'destroy']);
        Route::get('/my/{id}', [ReservationController::class, 'show']);
        Route::middleware(['auth:sanctum', 'role:client'])->group(function () {
    Route::prefix('user/reservations')->group(function () {
        Route::get('/my', [ReservationController::class, 'index']);
        Route::post('/my', [ReservationController::class, 'store']);
        Route::patch('/my/{id}', [ReservationController::class, 'update']);
        Route::delete('/my/{id}', [ReservationController::class, 'destroy']);
        Route::get('/my/{id}', [ReservationController::class, 'show']);

        
        Route::patch('/my/{id}/annuler', [ReservationController::class, 'annuler']);
    });
});

    });

    /**
     *  Voitures
     */
    Route::prefix('user/voitures')->group(function () {
        Route::get('/', [VoitureController::class, 'index']);
        Route::get('/show/{id}', [VoitureController::class, 'show']);
    });
    

});

/*
|------------------------------------------------------------------
| Admin seulement
|------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum','role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

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
        Route::get('/',   [ClientController::class, 'index']);
        Route::get('/reservation',   [ClientController::class, 'reservationClient']);
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
