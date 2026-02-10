import type { User, Voiture } from "./Types";

export type UserBackoffice = {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    last_sync_at: string | null;
};

export type CarBackoffice = {
    id: string;
    numero: string;
    nom: string;
    description: string;
    url_img: string;
    couleurHex: string;
    marque: string;
    annee: string;
    client: User | null;
    last_sync_at: string | null;
};

export type RepairBackoffice = {
    id: string;
    date: string;
    client: User | null;
    voiture: Voiture | null;
    static_statut: string;
    status: {
        id: number;
        code: number;
        nom: string;
        date: string;
    } | null;
    last_sync_at: string | null;
};
