import { useFirestoreDoc } from "@/engine/firestore/useFirestoreDoc";
import type { Reparation } from "@/types/Types";

export function useReparationById(reparationId: string | undefined) {
  const docPath = reparationId ? `reparations/${reparationId}` : "";
  return useFirestoreDoc<Reparation>(docPath);
}
