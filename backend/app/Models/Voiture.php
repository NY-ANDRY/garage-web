<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $table = 'voiture';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'uid_client',
        'numero',
        'nom',
        'description',
        'url_img',
        'couleur',
        'couleurHex',
        'marque',
        'année',
    ];

    protected $casts = [
        'année' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'uid_client', 'uid');
    }

    public function reparations()
    {
        return $this->hasMany(Reparation::class, 'id_voiture', 'id');
    }
}
