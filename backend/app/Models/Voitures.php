<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voitures extends Model
{
    use HasFactory;

    protected $table = 'voitures';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'uid_client',
        'numero',
        'nom',
        'description',
        'url_img',
        'couleurHex',
        'marque',
        'annee',
    ];

    // protected $casts = [
    //     'annee' => 'datetime',
    // ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'uid_client', 'uid');
    }

    public function reparations()
    {
        return $this->hasMany(Reparation::class, 'id_voiture', 'id');
    }

    public function synchronisations()
    {
        return $this->belongsToMany(Synchronisation::class, 'sync_voitures', 'id_voiture', 'id_sync')
            ->withTimestamps();
    }

    public static function saveFromFirebase($data)
    {
        return self::create([
            'id' => $data['id'] ?? null,
            'numero' => $data['data']['numero'] ?? null,
            'nom' => $data['data']['nom'] ?? null,
            'description' => $data['data']['description'] ?? null,
            'url_img' => $data['data']['url_img'] ?? null,
            'couleurHex' => $data['data']['couleurHex'] ?? null,
            'marque' => $data['data']['marque'] ?? null,
            'annee' => $data['data']['annee'] ?? null,
            'uid_client' => $data['data']['user']['uid'] ?? null,
        ]);
    }

    public static function syncById($id)
    {
        $voiture = self::find($id);
        if (!$voiture) {
            $firebase = new Firebase();
            $data = $firebase->getDocument('voitures', $id);
            return self::saveFromFirebase($data);
        }
        return null;
    }
}
