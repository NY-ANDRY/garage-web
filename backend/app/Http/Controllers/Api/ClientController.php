<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;

class ClientController extends Controller
{
    public function stats()
    {
        $dateDebut = request()->query('dateDebut');
        $dateFin = request()->query('dateFin');

        $data = Client::stats($dateDebut, $dateFin);

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function index()
    {
        $clients = \App\Models\Client::orderBy('displayName', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $clients
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
