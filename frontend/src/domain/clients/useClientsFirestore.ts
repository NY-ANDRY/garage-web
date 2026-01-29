import { useFirestoreCollection } from "@/engine/firestore/useFirestoreCollection";
import type { User } from "@/types/Types";

export function useClientsFirestore() {
  return useFirestoreCollection<User>('users');
}

