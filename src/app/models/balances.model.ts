export interface EEBalance {
    product: string;
    dossier: string;
    eeAmount: number;
}

export interface EIBalance {
    product: string;
    dossier: string;
    eiAmount: number;
}

export interface Reconciliation {
    product: string;
    dossier: string;
    eeAmount: number;
    eiAmount: number;
    status: string;
}

export interface FilterCriteria {
    field: string;
    value: any;
    operator?: 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'ne';
    negate?: boolean;
}

export interface SearchQuery {
    balanceDate: string;
    filters: FilterCriteria[];
    page: number;
    size: number;
}