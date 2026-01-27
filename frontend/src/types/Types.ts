import { Timestamp } from "firebase/firestore";

// chart types

export type InterventionChartData = {
    nom: string;
    nombre: number;
    prix: number;
};

export type ClientChartData = {
    date: string;
    number: number;
};

// stats
export type StatsInterventionItem = {
    id: number;
    nom: string;
    nombre_total: number;
    montant_total: number;
};

export type StatsInterventionTotal = {
    montant_total: number;
    nombre_total: number;
};

export type StatsInterventions = {
    stats: StatsInterventionItem[];
    sum: StatsInterventionTotal;
};

//
export type InterventionMaxStats = {
    total_cost: number;
    total_number: number;
};

export type UserMaxStats = {
    total_clients: number;
};

export type StatsClientTotal = {
    total_clients: number;
    filtered_clients: number;
};

export type StatsClients = {
    stats: ClientChartData[];
    sum: StatsClientTotal;
};

export type TableStatItem = {
    id: string;
    nom: string;
    nombre: number;
    montant_total: number;
};

// api

export type ApiResponse<T> = {
    success: boolean;
    data: T;
};

// firestore types

export type User = {
    uid?: string;
    email?: string | undefined | null;
    displayName?: string | undefined | null;
    photoURL?: string | undefined | null;
    fcmToken?: string | undefined | null;
};

export type Notification = {
    id: string;
    title: string;
    description?: string;
    read: boolean;
    url_img?: string;
    date: Timestamp;
};

export type Voiture = {
    id: string;
    numero: string;
    nom: string;
    description?: string;
    url_img?: string;
    couleurHex?: string;
    marque?: string;
    annee?: string;
    user?: User;
};

export type Intervention = {
    id: string;
    nom: string;
    prix: number;
    duree: number;
    image: string;
    statut?: number;
};

export type Statut_histo = {
    statut: number;
    date: Timestamp;
};

export type Paiement = {
    date: Timestamp;
    montant: number;
};

export type Reparation = {
    id?: string;
    voiture: Voiture;
    user: User;
    interventions: Intervention[];
    statut: number;
    statut_histo: Statut_histo[];
    paiements: Paiement[];
    paiement_statut: number;
    paiement_total: number;
    total_a_payer: number;
    date: Timestamp;
}