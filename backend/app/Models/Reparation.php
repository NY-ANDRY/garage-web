<?php

namespace App\Models;

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
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id');
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
        return $this->belongsToMany(Statut::class, 'reparations_statut', 'id_reparation', 'id_statut')
                    ->withPivot('date')
                    ->withTimestamps();
    }
}
