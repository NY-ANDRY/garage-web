<?php

namespace App\Models;

class Firebase
{
    private $url = 'https://firestore.googleapis.com/v1/projects/garage-44cc0/databases/(default)/documents';
    // private $basePath = 'projects/garage-44cc0/databases/(default)/documents';

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

    public function getDocument(string $collectionId, string $documentId): array
    {
        $ch = curl_init($this->url . '/' . $collectionId . '/' . $documentId);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($response, true) ?? [];
        return [
            'id' => $documentId,
            'data' => $this->parseFields($data['fields'] ?? [])
        ];
    }

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

    private function getAllDocuments(string $collectionId): array
    {
        $response = $this->post('', [
            'structuredQuery' => [
                'from' => [['collectionId' => $collectionId]]
            ]
        ]);
        return $this->formatFirestoreResponse($response);
    }

    public function getUsersAndExcludeUIDS(array $uids): array
    {
        // On récupère simplement tous les users
        $allUsers = $this->getAllDocuments('users');

        // Filtrage côté PHP si nécessaire
        if (!empty($uids)) {
            $allUsers = array_filter($allUsers, fn($user) => !in_array($user['data']['uid'] ?? null, $uids));
        }

        return array_values($allUsers); // réindexer
    }

    public function getVoituresAndExclude(array $ids): array
    {
        $all = $this->getAllDocuments('voitures');
        if (!empty($ids)) {
            $all = array_filter($all, fn($item) => !in_array($item['id'], $ids));
        }
        return array_values($all);
    }

    public function getReparationsAndExclude(array $ids): array
    {
        $all = $this->getAllDocuments('reparations');
        if (!empty($ids)) {
            $all = array_filter($all, fn($item) => !in_array($item['id'], $ids));
        }
        return array_values($all);
    }

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
        return array_filter(array_map(function ($item) {
            if (!isset($item['document']))
                return null;
            $doc = $item['document'];
            return [
                'id' => basename($doc['name']),
                'data' => $this->parseFields($doc['fields'] ?? [])
            ];
        }, is_array($data) ? $data : []));
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
