import { clsx, type ClassValue } from "clsx"
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
