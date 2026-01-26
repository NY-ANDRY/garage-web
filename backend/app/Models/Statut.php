<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statut extends Model
{
    use HasFactory;

    protected $table = 'statut';
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
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id');
    }

    public function reparations()
    {
        return $this->belongsToMany(Reparation::class, 'reparations_statut', 'id_statut', 'id_reparation')
                    ->withPivot('date')
                    ->withTimestamps();
    }
}
