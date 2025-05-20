<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dateDebut' => 'required|date|after_or_equal:today',
            'dateFin' => 'required|date|after:dateDebut',
            'statut' => 'nullable|in:payé,expiré,en cours,en attente',
            'montant_total' => 'required|numeric|min:0',
            'idClient' => 'required|exists:clients,id',
            'idVoiture' => 'required|exists:voitures,id',
        ];
    }

    public function messages(): array
    {
        return [
            'dateDebut.required' => 'La date de début est obligatoire.',
            'dateDebut.date' => 'La date de début doit être une date valide.',
            'dateDebut.after_or_equal' => 'La date de début doit être aujourd\'hui ou une date future.',
            
            'dateFin.required' => 'La date de fin est obligatoire.',
            'dateFin.date' => 'La date de fin doit être une date valide.',
            'dateFin.after' => 'La date de fin doit être postérieure à la date de début.',

            'montant_total.required' => 'Le montant total est requis.',
            'montant_total.numeric' => 'Le montant total doit être un nombre.',
            'montant_total.min' => 'Le montant total doit être supérieur ou égal à 0.',

            'idClient.required' => 'Le client est requis.',
            'idClient.exists' => 'Le client sélectionné n’existe pas.',

            'idVoiture.required' => 'La voiture est requise.',
            'idVoiture.exists' => 'La voiture sélectionnée n’existe pas.',
        ];
    }
}
