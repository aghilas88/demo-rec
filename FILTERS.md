# Système de Filtrage Type Kibana

## Vue d'ensemble

Le système de filtrage permet d'ajouter dynamiquement des filtres sur les données affichées, similaire à Kibana.

## Fonctionnalités

### Ajouter un filtre
- Cliquez sur le bouton **+** à côté de n'importe quelle valeur dans le tableau
- Le filtre sera automatiquement ajouté et les résultats seront rafraîchis

### Gestion des filtres
- **Affichage** : Les filtres actifs s'affichent dans une barre au-dessus du tableau
- **Négation** : Cliquez sur le bouton **−** dans un filtre pour basculer en mode "NOT" (exclusion)
- **Suppression** : Cliquez sur le **✕** pour supprimer un filtre individuel
- **Clear All** : Bouton pour supprimer tous les filtres en une fois

### Opérateurs disponibles
- `=` (equals) : Correspondance exacte
- `~` (contains) : Contient le texte
- `>` (gt) : Plus grand que
- `≥` (gte) : Plus grand ou égal
- `<` (lt) : Plus petit que
- `≤` (lte) : Plus petit ou égal
- `≠` (ne) : Différent de

## Architecture

### API
Les filtres sont envoyés via **POST** avec un body JSON :

```json
{
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
}
```

### Endpoints
- `POST /balance/ee/:configName/search`
- `POST /balance/ei/:configName/search`
- `POST /balance/reconciliation/:configName/search`

## Modèles

### FilterCriteria
```typescript
{
  field: string;           // Nom du champ à filtrer
  value: any;             // Valeur à rechercher
  operator?: string;      // Opérateur de comparaison
  negate?: boolean;       // Mode exclusion (NOT)
}
```

### SearchQuery
```typescript
{
  balanceDate: string;
  filters: FilterCriteria[];
  page: number;
  size: number;
}
```

## Composants

### FilterBarComponent
Composant réutilisable qui affiche et gère les filtres actifs.

**Inputs:**
- `filters` : Array de FilterCriteria

**Outputs:**
- `filtersChange` : Émis quand les filtres changent
- `filterRemoved` : Émis quand un filtre est supprimé

## Utilisation

Dans votre composant :

```typescript
filters: FilterCriteria[] = [];

addFilter(field: string, value: any) {
  const newFilter: FilterCriteria = {
    field,
    value,
    operator: 'equals',
    negate: false
  };
  this.filters.push(newFilter);
  this.fetchData();
}

onFiltersChanged() {
  this.fetchData();
}
```

Dans votre template :

```html
<app-filter-bar 
  [filters]="filters" 
  (filtersChange)="onFiltersChanged()">
</app-filter-bar>

<table>
  <tr *ngFor="let item of data">
    <td>
      {{ item.field }}
      <button (click)="addFilter('field', item.field)">+</button>
    </td>
  </tr>
</table>
```
