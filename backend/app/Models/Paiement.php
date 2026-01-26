<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $table = 'paiement';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'id_reparation',
        'montant',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
        'montant' => 'decimal:2',
    ];

    public function reparation()
    {
        return $this->belongsTo(Reparation::class, 'id_reparation', 'id');
    }
}
