<?php

namespace App\Models;

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
}
