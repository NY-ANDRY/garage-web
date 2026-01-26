<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ReparationIntervention extends Pivot
{
    protected $table = 'reparation_interventions';

    protected $fillable = [
        'id_intervention',
        'id_reparation',
        'prix',
        'duree',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
        'prix' => 'decimal:2',
    ];
}
