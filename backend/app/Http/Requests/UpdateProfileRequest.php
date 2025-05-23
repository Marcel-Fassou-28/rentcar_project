<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
        return [
            'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:utilisateurs,email,' . $this->route('id'),
        'birthday' => 'required|date',
        'adresse' => 'required|string|max:255',
        'telephone' => 'required|string|max:20',
        'photo.name' => 'nullable|string|max:255',
        'photo.data' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required'        => 'Le nom est obligatoire.',
            'prenom.required'     => 'Le prénom est obligatoire.',
            'email.required'      => 'L’e-mail est obligatoire.',
            'email.email'         => 'L’e-mail n’est pas valide.',
            'email.unique'        => 'Cet e-mail est déjà utilisé.',
            'adresse.required'    => 'L’adresse est obligatoire.',
            'telephone.required'  => 'Le numéro de téléphone est obligatoire.',
            'telephone.regex'     => 'Le format du numéro de téléphone est invalide.',
            'birthday.required'   => 'La date de naissance est obligatoire.',
            'birthday.date'       => 'La date de naissance n’est pas valide.',
            'birthday.before'     => 'La date de naissance doit être antérieure à aujourd’hui.',
        ];
    }
}
