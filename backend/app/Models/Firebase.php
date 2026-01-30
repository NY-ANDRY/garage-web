<?php

namespace App\Models;

class Firebase
{
    private $url = 'https://firestore.googleapis.com/v1/projects/garage-44cc0/databases/(default)/documents';
    // On définit le chemin de base des documents pour les références
    private $basePath = 'projects/garage-44cc0/databases/(default)/documents';

    private function post(string $endpoint, array $body): array
    {
        $ch = curl_init($this->url . '/' . $endpoint . ':runQuery');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($body),
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true) ?? [];
    }

    // === Réparations après une date ===
    public function getReparationsAfterDate(string $isoDate): array
    {
        $body = [
            'structuredQuery' => [
                'from' => [['collectionId' => 'reparations']],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => 'date'],
                        'op' => 'GREATER_THAN',
                        'value' => ['timestampValue' => $isoDate]
                    ]
                ]
            ]
        ];
        $response = $this->post('', $body);
        return $this->formatFirestoreResponse($response);
    }

    /**
     * Méthode générique pour exclure des documents par leur ID (clé primaire)
     */
    private function getDocumentsAndExclude(string $collectionId, array $ids): array
    {
        // Si la liste est vide, on retourne tout sans filtre
        if (empty($ids)) {
            $response = $this->post('', [
                'structuredQuery' => [
                    'from' => [['collectionId' => $collectionId]],
                ]
            ]);
            return $this->formatFirestoreResponse($response);
        }

        /**
         * IMPORTANT: Pour filtrer sur l'ID du document, Firestore utilise le champ spécial '__name__'.
         * La valeur doit être le chemin complet du document (referenceValue).
         */
        $values = array_map(function ($id) use ($collectionId) {
            return [
                'referenceValue' => "{$this->basePath}/{$collectionId}/{$id}"
            ];
        }, $ids);

        $body = [
            'structuredQuery' => [
                'from' => [['collectionId' => $collectionId]],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => '__name__'],
                        'op' => 'NOT_IN',
                        'value' => ['arrayValue' => ['values' => $values]]
                    ]
                ]
            ]
        ];

        $response = $this->post('', $body);
        return $this->formatFirestoreResponse($response);
    }

    // === Utilisateurs non dans liste d'UID ===
    // On garde celle-ci telle quelle car 'uid' semble être un CHAMP interne dans vos docs users
    public function getUsersAndExcludeUIDS(array $uids): array
    {
        if (empty($uids)) {
            $response = $this->post('', [
                'structuredQuery' => ['from' => [['collectionId' => 'users']]]
            ]);
            return $this->formatFirestoreResponse($response);
        }

        $values = array_map(fn($uid) => ['stringValue' => $uid], $uids);
        $body = [
            'structuredQuery' => [
                'from' => [['collectionId' => 'users']],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => 'uid'],
                        'op' => 'NOT_IN',
                        'value' => ['arrayValue' => ['values' => $values]]
                    ]
                ]
            ]
        ];

        $response = $this->post('', $body);
        return $this->formatFirestoreResponse($response);
    }

    // === Voitures non dans liste d'ID (Clé du document) ===
    public function getVoituresAndExclude(array $ids): array
    {
        return $this->getDocumentsAndExclude('voitures', $ids);
    }

    // === Réparations non dans liste d'ID (Clé du document) ===
    public function getReparationsAndExclude(array $ids): array
    {
        return $this->getDocumentsAndExclude('reparations', $ids);
    }

    // === Formattage (Inchangé) ===
    public function formatFirestoreResponse($data)
    {
        if (isset($data['fields'])) {
            return $this->parseFields($data['fields']);
        }
        if (isset($data['documents'])) {
            return array_map(function ($doc) {
                return [
                    'id' => basename($doc['name']),
                    'data' => $this->parseFields($doc['fields'])
                ];
            }, $data['documents']);
        }
        return array_map(function ($item) {
            if (!isset($item['document']))
                return null;
            $doc = $item['document'];
            return [
                'id' => basename($doc['name']),
                'data' => $this->parseFields($doc['fields'] ?? [])
            ];
        }, is_array($data) ? $data : []);
    }

    private function parseFields($fields)
    {
        $result = [];
        foreach ($fields as $key => $value) {
            $result[$key] = $this->parseValue($value);
        }
        return $result;
    }

    private function parseValue($value)
    {
        $type = array_key_first($value);
        $val = $value[$type] ?? null;
        switch ($type) {
            case 'mapValue':
                return $this->parseFields($val['fields'] ?? []);
            case 'arrayValue':
                return array_map([$this, 'parseValue'], $val['values'] ?? []);
            case 'integerValue':
                return (int) $val;
            case 'doubleValue':
                return (float) $val;
            case 'booleanValue':
                return (bool) $val;
            case 'timestampValue':
                return $val;
            case 'nullValue':
                return null;
            default:
                return $val;
        }
    }
}