<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\InterventionController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
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
});
