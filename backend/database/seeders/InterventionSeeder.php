<?php

namespace Database\Seeders;

use App\Models\Intervention;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InterventionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $interventions = [
            [
                'nom' => 'Vidange',
                'prix' => 1,
                'duree' => 5,
                'image' => 'https://i.postimg.cc/R07pnhDm/vidange.png'
            ],
            [
                'nom' => 'Systeme de refroidissement',
                'prix' => 120.00,
                'duree' => 2,
                'image' => 'https://i.postimg.cc/L6gT1hJV/system.png'
            ],
            [
                'nom' => 'Pneus',
                'prix' => 80.00,
                'duree' => 1.5,
                'image' => 'https://i.postimg.cc/d10Rt0M7/pneu.png'
            ],
            [
                'nom' => 'Filtre',
                'prix' => 80.00,
                'duree' => 1.5,
                'image' => 'https://i.postimg.cc/Hnqb24rt/filtre.png'
            ],
            [
                'nom' => 'Embrayage',
                'prix' => 80.00,
                'duree' => 1.5,
                'image' => 'https://i.postimg.cc/250vJfqn/embrayage.png'
            ],
            [
                'nom' => 'Amortisseur',
                'prix' => 80.00,
                'duree' => 1.5,
                'image' => 'https://i.postimg.cc/Z0zy3bQX/amortisseur.png'
            ],
            [
                'nom' => 'Batterie',
                'prix' => 80.00,
                'duree' => 1.5,
                'image' => 'https://i.postimg.cc/tRww1sqX/batterie.png'
            ],
            [
                'nom' => 'Frein',
                'prix' => 80.00,
                'duree' => 1.5,
                'image' => 'https://i.postimg.cc/8Cp08WHR/frein.png'
            ],
        ];

        foreach ($interventions as $intervention) {
            Intervention::create($intervention);
        }
    }
}
