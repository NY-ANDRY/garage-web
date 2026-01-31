<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Source::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'firebase',
            ]
        );
    }
}
