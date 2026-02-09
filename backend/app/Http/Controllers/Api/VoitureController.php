<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voitures;
use Illuminate\Http\Request;

class VoitureController extends Controller
{
    public function index()
    {
        $limit = request()->query('limit', 10);
        $search = request()->query('search');

        $query = Voitures::with([
            'client',
            'synchronisations' => function ($query) {
                $query->latest('sync_voitures.created_at')->limit(1);
            }
        ]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'ILIKE', "%{$search}%")
                    ->orWhere('numero', 'ILIKE', "%{$search}%")
                    ->orWhere('marque', 'ILIKE', "%{$search}%")
                    ->orWhereHas('client', function ($cq) use ($search) {
                        $cq->where('displayName', 'ILIKE', "%{$search}%");
                    });
            });
        }

        $voitures = $query->latest()->paginate($limit);

        $voitures->getCollection()->transform(function ($voiture) {
            $lastSync = $voiture->synchronisations->first();
            return [
                'id' => $voiture->id,
                'numero' => $voiture->numero,
                'nom' => $voiture->nom,
                'description' => $voiture->description,
                'url_img' => $voiture->url_img,
                'couleurHex' => $voiture->couleurHex,
                'marque' => $voiture->marque,
                'annee' => $voiture->annee,
                'client' => $voiture->client,
                'last_sync_at' => $lastSync ? $lastSync->pivot->created_at : null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $voitures
        ]);
    }
}
