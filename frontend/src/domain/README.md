# Architecture (3 couches)

## Moteur (`src/engine/`)
- Briques **génériques** et réutilisables.
- Exemples: `useFetch<T>`, `useMutate`, wrappers Firestore génériques.

## Métier (`src/domain/`)
- Hooks et services **orientés cas d'usage** (clients, interventions, stats, auth…).
- Ne contient pas de composants UI.
- La couche UI doit importer **uniquement** depuis cette couche (et `types/`, `lib/`, etc.).

## UI (`src/components/`, `src/pages/`, `src/layouts/`)
- Composants et pages.
- Ne parle pas directement au moteur (pas de `engine/*` en import).

