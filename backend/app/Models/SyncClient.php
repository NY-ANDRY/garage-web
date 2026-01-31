<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SyncClient extends Pivot
{
    protected $table = 'sync_clients';

    protected $fillable = [
        'id_sync',
        'uid',
    ];
}
