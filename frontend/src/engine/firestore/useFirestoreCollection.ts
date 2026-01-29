import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
  type Query,
} from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";

export function useFirestoreCollection<T extends DocumentData>(
  colOrQuery: string | Query<DocumentData>,
) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    if (!colOrQuery) return;

    setLoading(true);

    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    const q =
      typeof colOrQuery === "string"
        ? collection(firestore, colOrQuery)
        : colOrQuery;

    unsubscribeRef.current = onSnapshot(
      q,
      (snapshot) => {
        const result = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as T),
        }));

        setData(result);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      },
    );

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [colOrQuery]);

  return { data, loading };
}
