<?php

namespace App\Jobs;

use App\Models\Synchronisation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SyncAll implements ShouldQueue
{
    use Queueable;

    protected $sync;
    protected $date;

    /**
     * Create a new job instance.
     */
    public function __construct(Synchronisation $sync, $date = null)
    {
        $this->sync = $sync;
        $this->date = $date;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Synchronisation::syncClients($this->sync);

        Synchronisation::syncVoitures($this->sync);

        if ($this->date) {
            Synchronisation::syncReparationsAfterDate($this->sync, $this->date);
        } else {
            Synchronisation::syncAllReparations($this->sync);
        }

        $this->sync->setStatus(Synchronisation::STATUS_FINISHED);
    }

    public function failed(\Throwable $exception): void
    {
        $this->sync->setStatus(Synchronisation::STATUS_FAILED);
    }
}
