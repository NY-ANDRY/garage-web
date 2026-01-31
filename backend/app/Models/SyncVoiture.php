<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SyncVoiture extends Pivot
{
    protected $table = 'sync_voitures';

    protected $fillable = [
        'id_sync',
        'id_voiture',
    ];
}
