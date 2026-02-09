<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reparation;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    public function index()
    {
        $limit = request()->query('limit', 10);
        $search = request()->query('search');

        $query = Reparation::with([
            'client',
            'voiture',
            'statuts' => function ($query) {
                $query->latest('reparations_statuts.date');
            },
            'synchronisations' => function ($query) {
                $query->latest('sync_reparations.created_at')->limit(1);
            }
        ]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('client', function ($cq) use ($search) {
                    $cq->where('displayName', 'ILIKE', "%{$search}%");
                })->orWhereHas('voiture', function ($vq) use ($search) {
                    $vq->where('numero', 'ILIKE', "%{$search}%");
                });
            });
        }

        $reparations = $query->latest('date')->paginate($limit);

        $reparations->getCollection()->transform(function ($reparation) {
            $lastSync = $reparation->synchronisations->first();
            $latestStatus = $reparation->statuts->first();

            return [
                'id' => $reparation->id,
                'date' => $reparation->date,
                'client' => $reparation->client,
                'voiture' => $reparation->voiture,
                'status' => $latestStatus ? [
                    'id' => $latestStatus->id,
                    'code' => $latestStatus->code,
                    'nom' => $latestStatus->nom,
                    'date' => $latestStatus->pivot->date,
                ] : null,
                'last_sync_at' => $lastSync ? $lastSync->pivot->created_at : null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $reparations
        ]);
    }
}
