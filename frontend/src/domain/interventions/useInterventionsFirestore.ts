import type { Intervention } from "@/types/Types";
import { useFirestoreDoc } from "@/engine/firestore/useFirestoreDoc";
import { useFirestoreMutation } from "@/engine/firestore/useFirestoreMutation";

export function useInterventionsFirestoreMutation() {
  return useFirestoreMutation<Intervention>("interventions");
}

export function useInterventionFirestoreDoc(interventionId: string) {
  return useFirestoreDoc<Intervention>(`interventions/${interventionId}`);
}

