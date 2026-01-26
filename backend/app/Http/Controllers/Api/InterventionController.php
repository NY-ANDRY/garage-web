<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Api\StoreInterventionRequest;
use App\Http\Requests\Api\UpdateInterventionRequest;

class InterventionController extends Controller
{

    public function table()
    {
        $interventions = [
            ['id' => 1, 'nom' => 'Vidange', 'nombre' => 186, 'montant_total' => 80],
            ['id' => 2, 'nom' => 'Refroidissement', 'nombre' => 305, 'montant_total' => 200],
            ['id' => 3, 'nom' => 'Pneu', 'nombre' => 237, 'montant_total' => 120],
            ['id' => 4, 'nom' => 'Filtre', 'nombre' => 73, 'montant_total' => 190],
            ['id' => 5, 'nom' => 'Embrayage', 'nombre' => 209, 'montant_total' => 130],
            ['id' => 6, 'nom' => 'Amortisseur', 'nombre' => 214, 'montant_total' => 140],
            ['id' => 7, 'nom' => 'Batterie', 'nombre' => 250, 'montant_total' => 160],
            ['id' => 8, 'nom' => 'Frein', 'nombre' => 230, 'montant_total' => 150],
        ];

        return response()->json([
            'success' => true,
            'data' => $interventions
        ]);
    }

    public function getTableData()
    {
        $data = Intervention::getTableData();

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }



    public function max()
    {
        $stats = Intervention::getGlobalStats();

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function chart()
    {
        $stats = Intervention::getChartData();

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $interventions = Intervention::orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $interventions
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInterventionRequest $request)
    {
        $data = $request->validated();

        // Upload de l'image si présente
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('interventions', 'public');
        }

        $intervention = Intervention::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Intervention créée avec succès',
            'data' => $intervention
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'success' => false,
                'message' => 'Intervention non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $intervention
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInterventionRequest $request, $id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'success' => false,
                'message' => 'Intervention non trouvée'
            ], 404);
        }

        $data = $request->validated();

        // Upload de l'image si présente
        if ($request->hasFile('image')) {
            if ($intervention->image) {
                Storage::disk('public')->delete($intervention->image);
            }
            $data['image'] = $request->file('image')->store('interventions', 'public');
        }

        $intervention->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Intervention mise à jour',
            'data' => $intervention
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'success' => false,
                'message' => 'Intervention non trouvée'
            ], 404);
        }

        // Supprimer l'image si présente
        if ($intervention->image) {
            Storage::disk('public')->delete($intervention->image);
        }

        $intervention->delete();

        return response()->json([
            'success' => true,
            'message' => 'Intervention supprimée'
        ]);
    }
}
