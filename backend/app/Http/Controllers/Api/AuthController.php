<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Authenticate a user and issue an API token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authentify(Request $request)
    {
        // Validate the request input
        $request->validate([
            'email' => 'required|email|max:250', // Align with utilisateurs.email VARCHAR(250)
            'password' => 'required|string|min:6', // Add minimum length for security
        ]);

        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'message' => ['Email ou mot de passe incorrect'],
            ]);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Create a new API token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return a JSON response with user and token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }
}