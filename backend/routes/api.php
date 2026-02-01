<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InterventionController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\SynchronisationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // GET	/interventions	index
    // POST	/interventions	store
    // GET	/interventions/{id}	show
    // PUT/PATCH	/interventions/{id}	update
    // DELETE	/interventions/{id}	destroy
    // Routes API pour les interventions
    Route::apiResource('interventions', InterventionController::class);
    Route::apiResource('clients', ClientController::class);
    Route::get('/stats/interventions', [InterventionController::class, 'stats']);
    Route::get('/stats/clients', [ClientController::class, 'stats']);

    Route::prefix('sync')->group(function () {
        Route::get('/', [SynchronisationController::class, 'index']);
        Route::get('/{id}', [SynchronisationController::class, 'show']);
        Route::post('/', [SynchronisationController::class, 'sync']);
    });
});
