<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Synchronisation;
use App\Jobs\SyncClient;
use App\Jobs\SyncVoiture;
use App\Jobs\SyncReparation;
use Illuminate\Http\Request;

class SynchronisationController extends Controller
{
    public function index()
    {
        $syncs = Synchronisation::with([
            'statuts' => function ($query) {
                $query->latest()->limit(1);
            }
        ])->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $syncs,
            'last_sync' => $syncs->first()
        ]);
    }

    public function show($id)
    {
        $sync = Synchronisation::with(['clients', 'voitures', 'reparations', 'statuts'])->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $sync
        ]);
    }

    public function syncClients()
    {
        $sync = Synchronisation::create(['id_source' => 1]);
        $sync->setStatus(1);
        SyncClient::dispatch($sync);
        return response()->json([
            'success' => true,
            'message' => 'Client synchronization started',
            'data' => $sync->load('statuts')
        ]);
    }

    public function syncVoitures()
    {
        $sync = Synchronisation::create(['id_source' => 1]);
        $sync->setStatus(1);
        SyncVoiture::dispatch($sync);
        return response()->json([
            'success' => true,
            'message' => 'Car synchronization started',
            'data' => $sync->load('statuts')
        ]);
    }

    public function syncReparations(Request $request)
    {
        $date = $request->input('date');
        $sync = Synchronisation::create(['id_source' => 1]);
        $sync->setStatus(1);
        SyncReparation::dispatch($sync, $date);
        return response()->json([
            'success' => true,
            'message' => 'Reparation synchronization started',
            'data' => $sync->load('statuts')
        ]);
    }
}