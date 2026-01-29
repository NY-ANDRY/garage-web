import { collection, orderBy, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import type { Reparation } from "@/types/Types";
import { useFirestoreCollection } from "@/engine/firestore/useFirestoreCollection";

export function useReparationsClient(uid: string) {
  const q = query(
    collection(firestore, "reparations"),
    where("user.uid", "==", uid),
    orderBy("date", "desc")
  );

  return useFirestoreCollection<Reparation>(q);
}
