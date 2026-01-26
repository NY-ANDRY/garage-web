<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    /**
     * Statistiques journalières pour le mois d'avril 2024
     */
    public function stats()
    {
        $data = [];

        for ($day = 1; $day <= 30; $day++) {
            $date = sprintf("2024-04-%02d", $day);

            $data[] = [
                'date' => $date,
                'number' => rand(50, 499), // équivalent à Math.floor(Math.random() * 450) + 50
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function max()
    {
        $stats = [
            'total_number' => 225
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Affiche la liste des clients (exemple vide ici)
     */
    public function index()
    {
        // Exemple de réponse vide
        return response()->json([
            'success' => true,
            'data' => []
        ]);
    }

    /**
     * Affiche un client spécifique (exemple vide ici)
     */
    public function show($id)
    {
        // Exemple : client non trouvé
        return response()->json([
            'success' => false,
            'message' => 'Client non trouvé'
        ], 404);
    }

    /**
     * Création d'un client (exemple vide ici)
     */
    public function store(\Illuminate\Http\Request $request)
    {
        // Exemple de création
        return response()->json([
            'success' => true,
            'message' => 'Client créé avec succès',
            'data' => null
        ], 201);
    }

    /**
     * Mise à jour d'un client (exemple vide ici)
     */
    public function update(\Illuminate\Http\Request $request, $id)
    {
        // Exemple : client non trouvé
        return response()->json([
            'success' => false,
            'message' => 'Client non trouvé'
        ], 404);
    }

    /**
     * Suppression d'un client (exemple vide ici)
     */
    public function destroy($id)
    {
        // Exemple : client non trouvé
        return response()->json([
            'success' => false,
            'message' => 'Client non trouvé'
        ], 404);
    }
}
