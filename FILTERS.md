# Système de Filtrage Type Kibana

## Vue d'ensemble

Le système de filtrage permet d'ajouter dynamiquement des filtres sur les données affichées, similaire à Kibana.

## Fonctionnalités

### Ajouter un filtre
- Cliquez sur le bouton **+** à côté de n'importe quelle valeur dans le tableau
- Le filtre sera automatiquement ajouté et les résultats seront rafraîchis

### Gestion des filtres
- **Affichage** : Les filtres actifs s'affichent dans une barre au-dessus du tableau
- **Édition** : Cliquez directement sur un filtre pour le modifier (champ, opérateur, valeur)
- **Négation** : Cliquez sur le bouton **−** dans un filtre pour basculer en mode "NOT" (exclusion)
- **Suppression** : Cliquez sur le **✕** pour supprimer un filtre individuel
- **Clear All** : Bouton pour supprimer tous les filtres en une fois

### Éditer un filtre
1. Cliquez sur le badge d'un filtre actif dans la barre de filtres
2. Une modale s'ouvre avec les champs éditables :
   - **Champ** : Sélectionnez le champ à filtrer dans la liste déroulante
   - **Opérateur** : Choisissez l'opérateur de comparaison
   - **Valeur** : Entrez la nouvelle valeur à filtrer
3. Cliquez sur **Enregistrer** pour appliquer les modifications
4. Les résultats seront automatiquement rafraîchis

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
- `availableFields` : Array des champs disponibles pour les filtres (optionnel)

**Outputs:**
- `filtersChange` : Émis quand les filtres changent
- `filterRemoved` : Émis quand un filtre est supprimé

### EditFilterDialogComponent
Composant de dialogue modale pour éditer un filtre existant.

**Inputs:**
- `filter` : Le filtre à éditer (FilterCriteria)
- `availableFields` : Array des champs disponibles pour sélection

**Outputs:**
- `save` : Émis avec le filtre modifié quand l'utilisateur clique sur Enregistrer

## Utilisation

### Ajout de filtres rapide

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

### Édition de filtres avec liste de champs

Pour permettre l'édition complète avec sélection de champs :

```typescript
filters: FilterCriteria[] = [];
availableFields = ['product', 'account', 'amount', 'currency'];

// La filter-bar permet automatiquement l'édition
```

Dans votre template :

```html
<app-filter-bar 
  [filters]="filters"
  [availableFields]="availableFields"
  (filtersChange)="onFiltersChanged()">
</app-filter-bar>
```

### Exemple complet avec édition

```typescript
export class MyComponent {
  filters: FilterCriteria[] = [];
  availableFields = ['product', 'account', 'amount', 'currency', 'balanceDate'];
  
  // Ajout rapide depuis le tableau
  addFilter(field: string, value: any) {
    const newFilter: FilterCriteria = {
      field,
      value,
      operator: 'equals',
      negate: false
    };
    this.filters = [...this.filters, newFilter];
    this.fetchData();
  }
  
  // Appelé quand les filtres changent (édition, négation, suppression)
  onFiltersChanged() {
    this.fetchData();
  }
  
  fetchData() {
    // Envoyer les filtres à l'API
    this.service.search({
      balanceDate: this.selectedDate,
      filters: this.filters,
      page: 0,
      size: 20
    }).subscribe(data => {
      this.data = data;
    });
  }
}
```
