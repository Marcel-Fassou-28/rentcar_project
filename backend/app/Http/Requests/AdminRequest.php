<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Autorise la requête, à condition que la logique d'authentification soit gérée ailleurs (ex: middleware)
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|max:250|unique:utilisateurs,email',
            'password' => 'required|string|min:8',
            'birthay' => 'required|date|before:today',
            'adresse' => 'required|string|max:250',
            'telephone' => 'required|string|regex:/^0[5-7][0-9]{8}$/',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est requis.',
            'nom.string' => 'Le nom doit être une chaîne de caractères.',
            'nom.max' => 'Le nom ne peut pas dépasser 100 caractères.',

            'prenom.required' => 'Le prénom est requis.',
            'prenom.string' => 'Le prénom doit être une chaîne de caractères.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 100 caractères.',

            'email.required' => 'L\'adresse e-mail est requise.',
            'email.email' => 'L\'adresse e-mail n\'est pas valide.',
            'email.max' => 'L\'adresse e-mail ne peut pas dépasser 250 caractères.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',

            'password.required' => 'Le mot de passe est requis.',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',

            'birthay.required' => 'La date de naissance est requise.',
            'birthay.date' => 'La date de naissance doit être une date valide.',
            'birthay.before' => 'La date de naissance doit être antérieure à aujourd\'hui.',

            'adresse.required' => 'L\'adresse est requise.',
            'adresse.max' => 'L\'adresse ne peut pas dépasser 250 caractères.',

            'telephone.required' => 'Le numéro de téléphone est requis.',
            'telephone.regex' => 'Le numéro de téléphone doit être valide (ex: 06XXXXXXXX).',

            'photo.required' => 'La photo est requise.',
            'photo.image' => 'La photo doit être une image.',
            'photo.mimes' => 'La photo doit être au format jpeg, jpg ou png.',
            'photo.max' => 'La photo ne doit pas dépasser 2 Mo.',
        ];
    }
}
