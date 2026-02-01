<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Synchronisation;
use App\Jobs\SyncAll;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SynchronisationController extends Controller
{
    public function index()
    {
        $syncs = Synchronisation::with(['statuts'])
            ->orderBy('created_at', 'desc')
            ->get();

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

    public function sync(Request $request)
    {
        $date = $request->input('date');
        $useTask = $request->input('use_task', true);

        if ($date) {
            $date = Carbon::parse($date)->startOfDay()->toRfc3339String();
        }

        $sync = Synchronisation::create(['id_source' => 1]);
        $sync->setStatus(Synchronisation::STATUS_STARTED);

        if ($useTask) {
            SyncAll::dispatch($sync, $date);
        } else {
            SyncAll::dispatchAfterResponse($sync, $date);
        }

        return response()->json([
            'success' => true,
            'message' => 'Synchronization started',
            'data' => $sync->load('statuts')
        ]);
    }
}