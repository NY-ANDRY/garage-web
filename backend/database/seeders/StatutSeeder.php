<?php

namespace Database\Seeders;

use App\Models\Statuts_reparations;
use Illuminate\Database\Seeder;

class StatutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $statuts = [
            ['code' => 0, 'nom' => 'en attente'],
            ['code' => 1, 'nom' => 'en cours'],
            ['code' => 2, 'nom' => 'terminé'],
            ['code' => 3, 'nom' => 'payé'],
            ['code' => 4, 'nom' => 'récupéré'],
        ];

        foreach ($statuts as $statut) {
            Statuts_reparations::updateOrCreate(
                ['code' => $statut['code']],
                ['nom' => $statut['nom']]
            );
        }
    }
}
