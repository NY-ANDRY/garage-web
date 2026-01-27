<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Api\StoreInterventionRequest;
use App\Http\Requests\Api\UpdateInterventionRequest;

class InterventionController extends Controller
{

    public function stats()
    {
        $dateDebut = request()->query('dateDebut');
        $dateFin = request()->query('dateFin');
        $idUser = request()->query('idUser');

        $data = Intervention::stats($dateDebut, $dateFin, $idUser);

        return response()->json([
            'success' => true,
            'data' => $data
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
