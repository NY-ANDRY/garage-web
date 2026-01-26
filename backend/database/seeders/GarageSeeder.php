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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GarageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Désactiver les contraintes de clés étrangères pour le nettoyage
        Schema::disableForeignKeyConstraints();

        // Nettoyer les tables dans le bon ordre (ou toutes si FK désactivées)
        DB::table('paiement')->truncate();
        DB::table('reparation_interventions')->truncate();
        DB::table('reparations_statut')->truncate();
        DB::table('statut')->truncate();
        DB::table('reparations')->truncate();
        DB::table('voiture')->truncate();
        DB::table('clients')->truncate();

        Schema::enableForeignKeyConstraints();

        // 1. Créer quelques clients de base
        $clients = [];
        for ($i = 1; $i <= 5; $i++) {
            $clients[] = Client::create([
                'uid' => "user_seed_$i",
                'email' => "client$i@demo.com",
                'displayName' => "Client Démo $i",
                'photoURL' => "https://i.pravatar.cc/150?u=user_seed_$i"
            ]);
        }

        // 2. Créer des voitures pour ces clients
        $cars = [];
        foreach ($clients as $index => $client) {
            $cars[] = Voiture::create([
                'id' => "car_seed_" . ($index + 1),
                'uid_client' => $client->uid,
                'numero' => rand(1000, 9999) . " " . chr(rand(65, 90)) . chr(rand(65, 90)),
                'nom' => "Voiture Modèle " . ($index + 1),
                'marque' => "Marque " . ($index + 1),
                'année' => Carbon::now()->subYears(rand(1, 15))
            ]);
        }

        // 3. Récupérer toutes les interventions disponibles
        $interventionsList = Intervention::all();

        if ($interventionsList->isEmpty()) {
            $this->command->warn("Aucune intervention trouvée ! Assurez-vous d'avoir lancé InterventionSeeder d'abord.");
            return;
        }

        // 4. Pour CHAQUE intervention, créer entre 1 et 3 données
        // avec un montant total entre 25 et 50 pour cette catégorie d'intervention
        foreach ($interventionsList as $intervention) {
            $numReparations = rand(1, 3);
            $totalTarget = rand(25, 50);
            
            // On divise le montant total par le nombre de réparations
            $unitPrice = round($totalTarget / $numReparations, 2);

            for ($j = 0; $j < $numReparations; $j++) {
                $randomCar = $cars[array_rand($cars)];
                
                $reparation = Reparation::create([
                    'id' => "rep_" . Str::random(10),
                    'uid_client' => $randomCar->uid_client,
                    'id_voiture' => $randomCar->id,
                    'date' => Carbon::now()->subDays(rand(0, 60))
                ]);

                // Ajouter l'intervention via la table pivot avec le prix distribué
                $reparation->interventions()->attach($intervention->id, [
                    'prix' => $unitPrice,
                    'duree' => $intervention->duree,
                    'date' => $reparation->date
                ]);

                // Créer un paiement correspondant
                Paiement::create([
                    'id' => "pay_" . Str::random(10),
                    'id_reparation' => $reparation->id,
                    'montant' => $unitPrice,
                    'date' => $reparation->date
                ]);
                
                // Optionnellement créer un statut
                $statut = Statut::create([
                    'id' => "statut_" . Str::random(10),
                    'uid_client' => $randomCar->uid_client,
                    'id_voiture' => $randomCar->id,
                    'date' => $reparation->date
                ]);
                
                $reparation->statuts()->attach($statut->id, ['date' => $reparation->date]);
            }
        }
    }
}
