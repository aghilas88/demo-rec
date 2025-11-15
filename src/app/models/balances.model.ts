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