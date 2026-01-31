<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statuts_reparations extends Model
{
    use HasFactory;

    protected $table = 'statuts_reparations';
    protected $primaryKey = 'id';
    public $incrementing = true;

    protected $fillable = [
        'id',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function reparations()
    {
        return $this->belongsToMany(Reparation::class, 'reparations_statuts', 'id_statut', 'id_reparation')
            ->withPivot('date')
            ->withTimestamps();
    }
}
