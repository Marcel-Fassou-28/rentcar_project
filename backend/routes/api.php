<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\VoitureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/user/login', [AuthController::class, 'authentify'])->middleware('auth:sanctum');

