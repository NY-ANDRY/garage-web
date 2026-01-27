<?php

namespace App\Models;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $primaryKey = 'uid';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'uid',
        'email',
        'displayName',
        'photoURL',
    ];

    public function voitures()
    {
        return $this->hasMany(Voiture::class, 'uid_client', 'uid');
    }

    public function reparations()
    {
        return $this->hasMany(Reparation::class, 'uid_client', 'uid');
    }

    public static function stats($dateDebut = null, $dateFin = null)
    {
        // Default to last 30 days if no dates provided
        if (!$dateDebut) {
            $dateDebut = Carbon::now()->subDays(29)->format('Y-m-d');
        }
        if (!$dateFin) {
            $dateFin = Carbon::now()->format('Y-m-d');
        }

        $query = self::query();
        $query->whereDate('created_at', '>=', $dateDebut);
        $query->whereDate('created_at', '<=', $dateFin);

        $clients = $query->orderBy('created_at')->get();

        $grouped = $clients->groupBy(function ($date) {
            return Carbon::parse($date->created_at)->format('Y-m-d');
        });

        // Fill empty days
        $statsData = [];
        $period = CarbonPeriod::create($dateDebut, $dateFin);
        $totalNumber = 0;

        foreach ($period as $date) {
            $formattedDate = $date->format('Y-m-d');
            $count = isset($grouped[$formattedDate]) ? $grouped[$formattedDate]->count() : 0;
            $statsData[] = [
                'date' => $formattedDate,
                'number' => $count
            ];
            $totalNumber += $count;
        }

        return [
            'stats' => $statsData,
            'sum' => [
                'total_clients' => self::count(),
                'filtered_clients' => $totalNumber
            ]
        ];
    }
}
