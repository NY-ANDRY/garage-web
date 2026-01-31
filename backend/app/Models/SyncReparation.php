<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SyncReparation extends Pivot
{
    protected $table = 'sync_reparations';

    protected $fillable = [
        'id_sync',
        'id_reparation',
    ];
}
