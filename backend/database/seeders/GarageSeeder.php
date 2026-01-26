<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\Voiture;
use App\Models\Reparation;
use App\Models\Intervention;
use App\Models\Paiement;
use App\Models\Statut;
use Illuminate\Support\Str;
use Carbon\Carbon;

class GarageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Clients
        $client1 = Client::updateOrCreate(
            ['uid' => 'user_123'],
            [
                'email' => 'client1@example.com',
                'displayName' => 'John Doe',
                'photoURL' => 'https://i.pravatar.cc/150?u=user_123'
            ]
        );

        $client2 = Client::updateOrCreate(
            ['uid' => 'user_456'],
            [
                'email' => 'client2@example.com',
                'displayName' => 'Jane Smith',
                'photoURL' => 'https://i.pravatar.cc/150?u=user_456'
            ]
        );

        // 2. Create Voitures
        $car1 = Voiture::updateOrCreate(
            ['id' => 'car_001'],
            [
                'uid_client' => $client1->uid,
                'numero' => '1234 TAB',
                'nom' => 'Toyota Hilux',
                'description' => 'Black 4x4 pickup',
                'marque' => 'Toyota',
                'année' => Carbon::create(2020, 1, 1)
            ]
        );

        $car2 = Voiture::updateOrCreate(
            ['id' => 'car_002'],
            [
                'uid_client' => $client2->uid,
                'numero' => '5678 TBC',
                'nom' => 'Peugeot 308',
                'description' => 'White hatchback',
                'marque' => 'Peugeot',
                'année' => Carbon::create(2018, 5, 20)
            ]
        );

        // 3. Create Interventions (Assumes InterventionSeeder has run)
        $vidange = Intervention::where('nom', 'Vidange')->first();
        $frein = Intervention::where('nom', 'Frein')->first();
        $batterie = Intervention::where('nom', 'Batterie')->first();

        // 4. Create Reparations
        $rep1 = Reparation::updateOrCreate(
            ['id' => 'rep_001'],
            [
                'uid_client' => $client1->uid,
                'id_voiture' => $car1->id,
                'date' => Carbon::now()->subDays(5)
            ]
        );

        $rep2 = Reparation::updateOrCreate(
            ['id' => 'rep_002'],
            [
                'uid_client' => $client2->uid,
                'id_voiture' => $car2->id,
                'date' => Carbon::now()->subDays(2)
            ]
        );

        // 5. Link Reparations to Interventions (Pivot)
        if ($vidange && $frein) {
            $rep1->interventions()->syncWithoutDetaching([
                $vidange->id => ['prix' => $vidange->prix, 'duree' => $vidange->duree, 'date' => $rep1->date],
                $frein->id => ['prix' => $frein->prix, 'duree' => $frein->duree, 'date' => $rep1->date]
            ]);
        }

        if ($batterie) {
            $rep2->interventions()->syncWithoutDetaching([
                $batterie->id => ['prix' => $batterie->prix, 'duree' => $batterie->duree, 'date' => $rep2->date]
            ]);
        }

        // 6. Create Statuts
        $statutEnCours = Statut::updateOrCreate(
            ['id' => 'statut_001'],
            [
                'uid_client' => $client1->uid,
                'id_voiture' => $car1->id,
                'date' => Carbon::now()->subDays(5)
            ]
        );

        $statutTermine = Statut::updateOrCreate(
            ['id' => 'statut_002'],
            [
                'uid_client' => $client2->uid,
                'id_voiture' => $car2->id,
                'date' => Carbon::now()->subDays(1)
            ]
        );

        // Link statuses to reparations
        $rep1->statuts()->syncWithoutDetaching([$statutEnCours->id => ['date' => $rep1->date]]);
        $rep2->statuts()->syncWithoutDetaching([$statutTermine->id => ['date' => $rep2->date]]);

        // 7. Create Paiements
        Paiement::updateOrCreate(
            ['id' => 'pay_001'],
            [
                'id_reparation' => $rep1->id,
                'montant' => ($vidange ? $vidange->prix : 0) + ($frein ? $frein->prix : 0),
                'date' => Carbon::now()->subDays(4)
            ]
        );
    }
}
