<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nom',
        'prix',
        'duree',
        'image',
    ];

    public function reparations()
    {
        return $this->belongsToMany(Reparation::class, 'reparation_interventions', 'id_intervention', 'id_reparation')
            ->withPivot('prix', 'duree', 'date')
            ->withTimestamps();
    }

    public function tableStats($dateDebut = null, $dateFin = null, $idUser = null)
    {
        $query = $this->reparations();

        if ($dateDebut) {
            $query->where('reparation_interventions.date', '>=', $dateDebut);
        }

        if ($dateFin) {
            $query->where('reparation_interventions.date', '<=', $dateFin);
        }

        if ($idUser) {
            $query->where('reparations.uid_client', $idUser);
        }

        $totalNumber = $query->count();
        $totalCost = $query->sum('reparation_interventions.prix');

        return [
            'montant_total' => $totalCost,
            'nombre_total' => $totalNumber,
        ];
    }

    public static function stats($dateDebut = null, $dateFin = null, $idUser = null)
    {
        $result = [
            'stats' => [],
            'sum' => [
                'montant_total' => 0,
                'nombre_total' => 0
            ]
        ];
        $interventions = self::all();
        $statsData = [];
        $montant_total = 0;
        $nombre_total = 0;
        foreach ($interventions as $intervention) {
            $stats = $intervention->tableStats($dateDebut, $dateFin, $idUser);

            $montant_total += $stats['montant_total'];
            $nombre_total += $stats['nombre_total'];

            $statsData[] = [
                'id' => $intervention->id,
                'nom' => $intervention->nom,
                'nombre_total' => $stats['nombre_total'],
                'montant_total' => $stats['montant_total']
            ];
        }
        $result['stats'] = $statsData;
        $result['sum']['montant_total'] = $montant_total;
        $result['sum']['nombre_total'] = $nombre_total;

        return $result;
    }
}
