<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StatutSync extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'statut_sync';

    protected $fillable = [
        'statut',
    ];

    public function synchronisations()
    {
        return $this->belongsToMany(Synchronisation::class, 'sync_statuts', 'id_statut', 'id_sync')
            ->withTimestamps();
    }
}
