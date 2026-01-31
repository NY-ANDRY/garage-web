<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Synchronisation extends Model
{
    use HasFactory;

    protected $table = 'synchronisations';

    protected $fillable = [
        'id_source',
    ];

    public function source()
    {
        return $this->belongsTo(Source::class, 'id_source');
    }
    public function statuts()
    {
        return $this->belongsToMany(StatutSync::class, 'sync_statuts', 'id_sync', 'id_statut')
            ->withTimestamps();
    }

    public function setStatus($id)
    {
        // Ensure the status record exists in statut_sync table
        StatutSync::firstOrCreate(['id' => $id], ['statut' => $id == 1 ? 'Démarré' : 'Terminé']);
        $this->statuts()->attach($id);
    }
    public function clients()
    {
        return $this->belongsToMany(Client::class, 'sync_clients', 'id_sync', 'uid')
            ->withTimestamps();
    }

    public function voitures()
    {
        return $this->belongsToMany(Voitures::class, 'sync_voitures', 'id_sync', 'id_voiture')
            ->withTimestamps();
    }

    public function reparations()
    {
        return $this->belongsToMany(Reparation::class, 'sync_reparations', 'id_sync', 'id_reparation')
            ->withTimestamps();
    }

    public static function syncClients(Synchronisation $sync)
    {
        $clients = Client::all(['uid']);
        $uids = array_column($clients->toArray(), 'uid');

        $firebase = new Firebase();
        $users = $firebase->getUsersAndExcludeUIDS($uids);

        foreach ($users as $user) {
            $client = Client::saveFromFirebase($user);
            $sync->clients()->attach($client->uid);
        }

        $sync->setStatus(2);

        return $users;
    }

    public static function syncVoitures(Synchronisation $sync)
    {
        $clients = Voitures::all(['id']);
        $ids = array_column($clients->toArray(), 'id');

        $firebase = new Firebase();
        $voitures = $firebase->getVoituresAndExclude($ids);

        foreach ($voitures as $voiture) {
            $v = Voitures::saveFromFirebase($voiture);
            $sync->voitures()->attach($v->id);
        }

        $sync->setStatus(2);

        return $voitures;
    }

    public static function syncAllReparations(Synchronisation $sync)
    {
        $firebase = new Firebase();
        $reparations = Reparation::all(['id']);
        $ids = array_column($reparations->toArray(), 'id');
        $newReparations = $firebase->getReparationsAndExclude($ids);

        return self::processReparations($sync, $newReparations);
    }

    public static function syncReparationsAfterDate(Synchronisation $sync, $date)
    {
        $firebase = new Firebase();
        $newReparations = $firebase->getReparationsAfterDate($date);

        return self::processReparations($sync, $newReparations);
    }

    private static function processReparations(Synchronisation $sync, array $reparations)
    {
        foreach ($reparations as $rep) {
            $uid_client = $rep['data']['user']['uid'] ?? null;
            $id_voiture = $rep['data']['voiture']['id'] ?? null;

            if ($uid_client) {
                $client = Client::syncByUid($uid_client);
                if ($client) {
                    $sync->clients()->syncWithoutDetaching([$client->uid]);
                }
            }

            if ($id_voiture) {
                $voiture = Voitures::syncById($id_voiture);
                if ($voiture) {
                    $sync->voitures()->syncWithoutDetaching([$voiture->id]);
                }
            }

            // Check if reparation exists
            if (Reparation::find($rep['id'])) {
                $reparation = Reparation::updateStatutAndPaiementFromFirebase($rep);
            } else {
                $reparation = Reparation::saveFromFirebase($rep);
            }

            if ($reparation) {
                $sync->reparations()->syncWithoutDetaching([$reparation->id]);
            }
        }

        $sync->setStatus(2);

        return $reparations;
    }

}
