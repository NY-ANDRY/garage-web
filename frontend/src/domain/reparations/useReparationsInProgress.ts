import { collection, query, where, orderBy } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import type { Reparation } from "@/types/Types";
import { useFirestoreCollection } from "@/engine/firestore/useFirestoreCollection";

export function useReparationsInProgress() {
  const q = query(
    collection(firestore, "reparations"),
    where("statut", "==", 1)
  );

  return useFirestoreCollection<Reparation>(q);
}
