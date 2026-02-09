import { query, collection, where, orderBy } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import { useFirestoreCollection } from "@/engine/firestore/useFirestoreCollection";
import type { User } from "@/types/Types";
import { useFirestoreDoc } from "@/engine/firestore/useFirestoreDoc";
import { useFirestoreMutation } from "@/engine/firestore/useFirestoreMutation";

export function useClientsFirestore(searchTerm: string = "") {
  const usersRef = collection(firestore, 'users');

  const q = searchTerm 
    ? query(
        usersRef, 
        orderBy("displayName"), 
        where("displayName", ">=", searchTerm), 
        where("displayName", "<=", searchTerm + "\uf8ff")
      )
    : usersRef;

  return useFirestoreCollection<User>(q);
}

export function useUserFirestoreDoc(clientId: string) {
  return useFirestoreDoc<User>(`users/${clientId}`);
}

export function useClientsFirestoreMutation() {
  return useFirestoreMutation<User>("users");
}