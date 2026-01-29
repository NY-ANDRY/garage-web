import { query, collection, where, orderBy } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import { useFirestoreCollection } from "@/engine/firestore/useFirestoreCollection";
import type { User } from "@/types/Types";

export function useClientsFirestore(searchTerm: string = "") {
  // On définit la base de la collection
  const usersRef = collection(firestore, 'users');

  // Si on a un mot-clé, on crée une requête filtrée (préfixe)
  // Sinon, on passe simplement la référence de la collection
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