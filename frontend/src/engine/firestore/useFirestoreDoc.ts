import { useEffect, useState } from "react";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";

export function useFirestoreDoc<T extends DocumentData>(docPath: string) {
  const [data, setData] = useState<(T & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docPath) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const docRef = doc(firestore, docPath);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...(snapshot.data() as T) });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore doc error:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [docPath]);

  return { data, loading };
}

