<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class UpdateVoitureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id'); // Récupère l'ID pour la mise à jour

        return [
            'car_name' => ['required', 'string', 'max:100'],
            'car_model' => ['required', 'string', 'max:100'],
            'car_categorie' => ['required', 'string', 'in:SUV,berline,citadine,luxe,compact,4x4'],
            'price' => ['required', 'numeric', 'min:0'],
            'place' => ['required', 'numeric'],
            'moteur' => ['nullable', 'string', 'max:50'],
            'transmission' => ['nullable', 'string', 'max:50'],
            'immatriculation' => ['required', 'string', 'max:100', 'unique:voitures,immatriculation,' . $id],
            'car_photo.name' => 'nullable|string|max:255',
            'car_photo.data' => 'nullable|string',     
        ];
    }

    /**
     * Get custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'car_name.required' => 'Le nom de la voiture est obligatoire.',
            'car_name.string' => 'Le nom de la voiture doit être une chaîne de caractères.',
            'car_name.max' => 'Le nom de la voiture ne peut pas dépasser :max caractères.',
            'car_model.required' => 'Le modèle de la voiture est obligatoire.',
            'car_model.string' => 'Le modèle de la voiture doit être une chaîne de caractères.',
            'car_model.max' => 'Le modèle de la voiture ne peut pas dépasser :max caractères.',
            'car_categorie.required' => 'La catégorie de la voiture est obligatoire.',
            'car_categorie.in' => 'La catégorie doit être l’une des suivantes : SUV, berline, citadine, luxe, compact, 4x4.',
            'immatriculation.required' => 'L’immatriculation est obligatoire.',
            'immatriculation.string' => 'L’immatriculation doit être une chaîne de caractères.',
            'immatriculation.max' => 'L’immatriculation ne peut pas dépasser :max caractères.',
            'immatriculation.unique' => 'Cette immatriculation est déjà utilisée.',
            'statut.required' => 'Le statut de la voiture est obligatoire.',
            'statut.in' => 'Le statut doit être l’un des suivants : réservé, disponible, loué.',
            'car_photo.string' => 'La photo de la voiture doit être une chaîne de caractères.',
            'car_photo.max' => 'La photo de la voiture ne peut pas dépasser :max caractères.',
            'place.required' => 'Le nombre de place est requis',
        ];
    }

    
}