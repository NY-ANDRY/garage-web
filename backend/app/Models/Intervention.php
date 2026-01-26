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
                    ->withPivot('duree', 'date')
                    ->withTimestamps();
    }
}
