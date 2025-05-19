<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\Utilisateur;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Inscription d’un nouvel utilisateur.
     */
    public function register(UserRequest $request): JsonResponse
    {
        
        try {
            $user = $request->validated();
            $user['password'] = Hash::make($user['password']);
            $user = Utilisateur::create($user);

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur créé avec succès.',
                'utilisateur'    => $user,
            
            ], 201);

        } catch(Exception $e) {
            return response()->json($e);
        }
        
    }

    /**
     * Connexion d’un utilisateur.
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = Auth::user();
            $token = $user->createToken('MA_CLEE_SECRETE')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie.',
                'user'    => $user,
                'token' => $token,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Identifiants incorrects.',
            ], 401);
        }   
    }

    /**
     * Pour afficher les certaines informations générales sur le site
     * Commme le nombre d'utilisateurs qui nous font confiance
     * Les notes, etc...
     */
    public function all() {

    }
}


