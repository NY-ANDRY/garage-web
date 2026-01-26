<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInterventionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Retourne true si l'utilisateur est autorisé à modifier
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
            'nom' => 'sometimes|required|string|max:255',
            'prix' => 'sometimes|required|numeric',
            'duree' => 'sometimes|required|integer',
            'image' => 'nullable|image|max:2048', // image optionnelle, max 2MB
        ];
    }
}
