import { clsx, type ClassValue } from "clsx"
import type { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function writeNumber(value: number | string | undefined | null): number {
  if (!value || value === "") {
    return 0;
  }
  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num)) return 0; // sécurité

  return Math.round(num * 100) / 100;
}

export const formatFirestoreTimestamp = (date: Timestamp) =>
  date.toDate().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const getStatutLabel = (statut: number) => {
  switch (statut) {
    case 0:
      return { label: "En attente", variant: "secondary" as const };
    case 1:
      return { label: "En cours", variant: "default" as const };
    case 2:
      return { label: "Terminé", variant: "outline" as const };
    default:
      return { label: "Inconnu", variant: "destructive" as const };
  }
};

export const getPaiementLabel = (statut: number) => {
  switch (statut) {
    case 0:
      return { label: "Non payé", variant: "destructive" as const };
    case 1:
      return { label: "Partiel", variant: "secondary" as const };
    case 2:
      return { label: "Payé", variant: "default" as const };
    default:
      return { label: "—", variant: "outline" as const };
  }
};