# Mock API Backend

Un serveur Express simple qui mock l'API de balance-explorer.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm run server
```

Le serveur démarre sur `http://localhost:8080`

## Endpoints disponibles

- `GET /balance/ee/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`
- `GET /balance/ei/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`
- `GET /balance/reconciliation/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`

## Exemple

```bash
curl "http://localhost:8080/balance/ee/config1?balanceDate=2024-01-01&page=0&size=10"
```

Le serveur génère 100 entrées de mock data au total. Utilisez les paramètres `page` et `size` pour la pagination.
