<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SyncFirebase;
use App\Models\Firebase;
use App\Models\Synchronisation;
use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function test()
    {
        //
        // $firebase = new Firebase();
        // $isoDate = '2026-01-30T00:00:00Z';
        // $test = $firebase->getVoituresAndExclude(['9QHJyPMVy2HciiqaTVHn', 'LXzHYO5TfXQX6oV2XwUe', 'V9XXjlAaaB1HCDTxlT3M', 'hXTH7JTfbquk1guWYV45', 'lP39rGJSGeajmOXYxHC9', 'mLdCACTSJrfLAJpNuFqN','nOrDDbAmGDMxGetQNnmP', 'oFq3DExWat1olQYiMdgb']);
        // $test = $firebase->getReparationsAfterDate($isoDate);
        // return response()->json($test);
        //

        //
        // SyncFirebase::dispatch();
        // $tests = Test::latest()->take(5)->get();
        // return response()->json([
        //     'message' => 'Job dispatched, latest tests:',
        //     'data' => $tests,
        // ]);
        //

        $sync = Synchronisation::create(['id_source' => 1]); // Assuming source 1 is Firebase
        return response()->json(Synchronisation::syncAllReparations($sync));
    }

}
