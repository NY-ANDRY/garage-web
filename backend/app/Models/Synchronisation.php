<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Synchronisation extends Model
{
    use HasFactory;

    protected $table = 'synchronisations';

    protected $fillable = [
        'source',
        'synchronised_at',
    ];

    protected $casts = [
        'synchronised_at' => 'datetime',
    ];

    /**
     * 🔗 Clients importés lors de cette synchronisation
     */
    public function clients(): HasMany
    {
        return $this->hasMany(Client::class, 'synchronisation_id');
    }

    /**
     * 🔗 Voitures importées lors de cette synchronisation
     */
    public function voitures(): HasMany
    {
        return $this->hasMany(Voiture::class, 'synchronisation_id');
    }

    /**
     * 🔗 Réparations importées lors de cette synchronisation
     */
    public function reparations(): HasMany
    {
        return $this->hasMany(Reparation::class, 'synchronisation_id');
    }
}
