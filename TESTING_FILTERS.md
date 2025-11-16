# Test du Système de Filtrage

## Démarrage

1. **Démarrer le serveur API** :
```bash
npm run server
```

2. **Démarrer l'application Angular** (dans un autre terminal) :
```bash
npm start
```

## Scénario de test

### Test 1 : Filtre simple
1. Allez sur "EE Balances"
2. Sélectionnez une config et une date
3. Cliquez sur "Search"
4. Cliquez sur le bouton **+** à côté d'un produit
5. Vérifier que :
   - Le filtre apparaît dans la barre de filtres
   - Les résultats sont filtrés automatiquement

### Test 2 : Filtres multiples
1. Ajoutez un filtre sur "product"
2. Ajoutez un filtre sur "dossier"
3. Vérifier que les deux filtres s'affichent
4. Vérifier que seules les lignes correspondant aux DEUX filtres sont affichées

### Test 3 : Négation de filtre
1. Ajoutez un filtre
2. Cliquez sur le bouton **−** dans le chip du filtre
3. Vérifier que :
   - Le filtre change de couleur (devient orange)
   - Le label affiche "NOT"
   - Les résultats excluent maintenant cette valeur

### Test 4 : Suppression de filtres
1. Ajoutez plusieurs filtres
2. Cliquez sur **✕** pour supprimer un filtre
3. Vérifier que le filtre est supprimé et les résultats mis à jour
4. Cliquez sur "Clear All"
5. Vérifier que tous les filtres sont supprimés

### Test 5 : Pagination avec filtres
1. Ajoutez des filtres
2. Naviguez entre les pages
3. Vérifier que les filtres restent actifs sur toutes les pages

## Exemple de requête POST

### Request
```
POST http://localhost:8080/balance/ee/CONFIG_PROD_01/search
Content-Type: application/json

{
  "balanceDate": "2024-01-15",
  "filters": [
    {
      "field": "product",
      "value": "PRODUCT_5",
      "operator": "equals",
      "negate": false
    },
    {
      "field": "eeAmount",
      "value": 50000,
      "operator": "gt",
      "negate": false
    }
  ],
  "page": 0,
  "size": 20
}
```

### Response
```json
[
  {
    "product": "PRODUCT_5",
    "dossier": "DOS000005",
    "eeAmount": 75432.50
  }
]
```

## Tests serveur (avec curl ou Postman)

### Test GET classique (toujours fonctionnel)
```bash
curl "http://localhost:8080/balance/ee/CONFIG_PROD_01?balanceDate=2024-01-15&page=0&size=20"
```

### Test POST avec filtres
```bash
curl -X POST http://localhost:8080/balance/ee/CONFIG_PROD_01/search \
  -H "Content-Type: application/json" \
  -d '{
    "balanceDate": "2024-01-15",
    "filters": [
      {
        "field": "product",
        "value": "PRODUCT_1",
        "operator": "equals",
        "negate": false
      }
    ],
    "page": 0,
    "size": 20
  }'
```

### Test avec filtre négatif
```bash
curl -X POST http://localhost:8080/balance/reconciliation/CONFIG_PROD_01/search \
  -H "Content-Type: application/json" \
  -d '{
    "balanceDate": "2024-01-15",
    "filters": [
      {
        "field": "status",
        "value": "OK",
        "operator": "equals",
        "negate": true
      }
    ],
    "page": 0,
    "size": 20
  }'
```

Cela retournera seulement les reconciliations avec un status **différent** de "OK".
