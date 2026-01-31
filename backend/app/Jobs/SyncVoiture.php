<?php

namespace App\Jobs;

use App\Models\Synchronisation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SyncVoiture implements ShouldQueue
{
    use Queueable;

    protected $sync;

    /**
     * Create a new job instance.
     */
    public function __construct(Synchronisation $sync)
    {
        $this->sync = $sync;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Synchronisation::syncVoitures($this->sync);
    }
}
