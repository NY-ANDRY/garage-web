<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreInterventionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // si tu veux gérer des permissions, tu peux mettre une logique ici
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'duree' => 'required|integer',
            'image' => 'nullable|image|max:2048', // max 2MB
        ];
    }
}
