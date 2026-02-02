<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparation extends Model
{
    use HasFactory;

    protected $table = 'reparations';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'uid_client',
        'id_voiture',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'uid_client', 'uid');
    }

    public function voiture()
    {
        return $this->belongsTo(Voitures::class, 'id_voiture', 'id');
    }

    public function interventions()
    {
        return $this->belongsToMany(Intervention::class, 'reparation_interventions', 'id_reparation', 'id_intervention')
            ->withPivot('prix', 'duree', 'date')
            ->withTimestamps();
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class, 'id_reparation', 'id');
    }

    public function statuts()
    {
        return $this->belongsToMany(Statuts_reparations::class, 'reparations_statuts', 'id_reparation', 'id_statut')
            ->withPivot('date')
            ->withTimestamps();
    }

    public function synchronisations()
    {
        return $this->belongsToMany(Synchronisation::class, 'sync_reparations', 'id_reparation', 'id_sync')
            ->withTimestamps();
    }

    public static function saveFromFirebase($data)
    {
        $id = $data['id'] ?? null;
        $repData = $data['data'] ?? [];

        $reparation = self::updateOrCreate(
            ['id' => $id],
            [
                'uid_client' => $repData['user']['uid'] ?? null,
                'id_voiture' => $repData['voiture']['id'] ?? null,
                'date' => isset($repData['date']) ? Carbon::parse($repData['date']) : null,
            ]
        );

        if (isset($repData['interventions']) && is_array($repData['interventions'])) {
            $reparation->syncInterventions($repData['interventions']);
        }

        if (isset($repData['paiements']) && is_array($repData['paiements'])) {
            $reparation->syncPaiements($repData['paiements']);
        }

        if (isset($repData['statut_histo']) && is_array($repData['statut_histo'])) {
            $reparation->syncStatuts($repData['statut_histo']);
        }

        return $reparation;
    }

    public static function updateStatutAndPaiementFromFirebase($data)
    {
        $id = $data['id'] ?? null;
        $repData = $data['data'] ?? [];

        $reparation = self::find($id);
        if (!$reparation) {
            return null;
        }

        if (isset($repData['paiements']) && is_array($repData['paiements'])) {
            $reparation->syncPaiements($repData['paiements']);
        }

        if (isset($repData['statut_histo']) && is_array($repData['statut_histo'])) {
            $reparation->syncStatuts($repData['statut_histo']);
        }

        return $reparation;
    }

    public function syncInterventions(array $interventions)
    {
        $syncData = [];
        foreach ($interventions as $inter) {
            $intervention = Intervention::firstOrCreate(
                ['id' => $inter['id']],
                [
                    'nom' => $inter['nom'] ?? '',
                    'prix' => $inter['prix'] ?? 0,
                    'duree' => $inter['duree'] ?? 0,
                    'image' => $inter['image'] ?? '',
                ]
            );
            $syncData[$intervention->id] = [
                'prix' => $inter['prix'] ?? 0,
                'duree' => $inter['duree'] ?? 0,
                'date' => $this->date,
            ];
        }
        $this->interventions()->sync($syncData);
    }

    public function syncPaiements(array $paiements)
    {
        $this->paiements()->delete();
        foreach ($paiements as $pay) {
            $this->paiements()->create([
                'montant' => $pay['montant'] ?? 0,
                'date' => isset($pay['date']) ? Carbon::parse($pay['date']) : null,
            ]);
        }
    }

    public function syncStatuts(array $statutHisto)
    {
        foreach ($statutHisto as $histo) {
            $statutId = $histo['statut'];
            Statuts_reparations::firstOrCreate(['id' => $statutId]);
            $this->statuts()->syncWithoutDetaching([
                $statutId => ['date' => isset($histo['date']) ? Carbon::parse($histo['date']) : null]
            ]);
        }
    }
}

