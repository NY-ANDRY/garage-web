import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
} from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export function useFirestoreData<T extends DocumentData>(
  collectionName: string
) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    setLoading(true);

    // Nettoyage de l’ancienne subscription
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    const colRef = collection(firestore, collectionName);

    unsubscribeRef.current = onSnapshot(
      colRef,
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));

        setData(result);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    // Cleanup au unmount ou changement de collection
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [collectionName]);

  return { data, loading };
}
