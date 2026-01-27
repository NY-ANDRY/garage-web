<?php

namespace App\Models;

class Firebase
{
    private $url = 'https://firestore.googleapis.com/v1/projects/garage-44cc0/databases/(default)/documents';




    /**
     * Convertit un tableau associatif standard en format Firestore Fields
     */
    public function formatToFirestore($data)
    {
        $fields = [];

        foreach ($data as $key => $value) {
            $fields[$key] = $this->wrapValue($value);
        }

        // On retourne la structure attendue par l'API : {"fields": {...}}
        return ['fields' => $fields];
    }

    private function wrapValue($value)
    {
        if (is_null($value)) {
            return ['nullValue' => null];
        }

        if (is_bool($value)) {
            return ['booleanValue' => $value];
        }

        if (is_int($value)) {
            return ['integerValue' => (string) $value]; // Firestore attend les nombres en string dans le JSON
        }

        if (is_float($value) || is_double($value)) {
            return ['doubleValue' => $value];
        }

        if (is_array($value)) {
            // Vérifie si c'est un tableau associatif (Map) ou séquentiel (Array)
            if (array_keys($value) === range(0, count($value) - 1)) {
                return [
                    'arrayValue' => [
                        'values' => array_map([$this, 'wrapValue'], $value)
                    ]
                ];
            } else {
                return [
                    'mapValue' => [
                        'fields' => $this->formatToFirestore($value)['fields']
                    ]
                ];
            }
        }

        // Par défaut, on traite comme une string
        return ['stringValue' => (string) $value];
    }

    /**
     * Convertit le format spécifique de Firestore en JSON standard
     */
    public function formatFirestoreResponse($data)
    {
        // Si c'est un document complet, on commence par 'fields'
        if (isset($data['fields'])) {
            return $this->parseFields($data['fields']);
        }

        // Si c'est une liste de documents
        if (isset($data['documents'])) {
            return array_map(function ($doc) {
                return [
                    'id' => basename($doc['name']), // Récupère l'ID à la fin du chemin
                    'data' => $this->parseFields($doc['fields'])
                ];
            }, $data['documents']);
        }

        return $data;
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
        // Détermine le type de données Firestore
        $type = array_key_first($value);
        $val = $value[$type];

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
                return $val; // Tu peux aussi convertir en DateTime ici
            case 'nullValue':
                return null;
            default:
                return $val; // stringValue, referenceValue, etc.
        }
    }
}