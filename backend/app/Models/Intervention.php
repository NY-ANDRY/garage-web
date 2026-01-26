<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;

    protected $fillable = [
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

    public function getTableStat()
    {
        $totalNumber = $this->reparations()->count();
        $totalCost = $this->reparations()->sum('reparation_interventions.prix');

        return [
            'total_cost' => $totalCost,
            'total_number' => $totalNumber,
        ];
    }

    public static function getChartData()
    {
        $interventions = self::all();
        $chartData = [];
        foreach ($interventions as $intervention) {
            $stats = $intervention->getTableStat();

            $chartData[] = [
                'nom' => $intervention->nom,
                'nombre' => $stats['total_number'],
                'prix' => $stats['total_cost'],
            ];
        }
        return $chartData;
    }
}
