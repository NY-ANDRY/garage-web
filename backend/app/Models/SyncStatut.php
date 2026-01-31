<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SyncStatut extends Pivot
{
    protected $table = 'sync_statuts';

    protected $fillable = [
        'id_sync',
        'id_statut',
    ];
}
