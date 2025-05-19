<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class UserRequest extends FormRequest
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
            'nom'       => ['required', 'string', 'max:100'],
            'prenom'    => ['required', 'string', 'max:100'],
            'email'     => ['required', 'string', 'email', 'max:250', 'unique:utilisateurs,email'],
            'adresse'   => ['required', 'string', 'max:250'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
            'telephone' => ['required', 'string', 'regex:/^0[0-9]\d{8}$/'],
            'birthday'  => ['required', 'date', 'before:today'],
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
            'password.required'   => 'Le mot de passe est obligatoire.',
            'password.min'        => 'Le mot de passe doit contenir au moins :min caractères.',
            'password.confirmed'  => 'La confirmation du mot de passe ne correspond pas.',
            'telephone.required'  => 'Le numéro de téléphone est obligatoire.',
            'telephone.regex'     => 'Le format du numéro de téléphone est invalide.',
            'birthday.required'   => 'La date de naissance est obligatoire.',
            'birthday.date'       => 'La date de naissance n’est pas valide.',
            'birthday.before'     => 'La date de naissance doit être antérieure à aujourd’hui.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors'  => $errors,
            ], 422)
        );
    }
}
