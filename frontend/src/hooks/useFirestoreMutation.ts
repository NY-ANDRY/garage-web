import { useState } from "react";
import {
    doc,
    updateDoc,
    setDoc,
    deleteDoc,
    addDoc,
    collection,
    type DocumentData,
} from "firebase/firestore";

import { firestore } from "@/config/firebaseConfig";

type MutationType = "update" | "set" | "delete";

export function useFirestoreMutation<T extends DocumentData>(
    collectionName: string
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (
        payload?: T,
        options?: {
            type?: MutationType;
            id?: string | number; // autoriser number ici
        }
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const type = options?.type ?? "update";

            // Convertir l'ID en string pour Firestore
            const docId = options?.id !== undefined ? String(options.id) : undefined;

            // SET (create or replace)
            if (type === "set" && payload) {
                if (docId) {
                    const docRef = doc(firestore, collectionName, docId);
                    await setDoc(docRef, payload);
                } else {
                    const colRef = collection(firestore, collectionName);
                    await addDoc(colRef, payload);
                }
                return;
            }

            // UPDATE / DELETE nécessitent un ID
            if (!docId) {
                throw new Error("ID requis pour update ou delete");
            }

            const docRef = doc(firestore, collectionName, docId);

            if (type === "update" && payload) {
                await updateDoc(docRef, payload);
            }

            if (type === "delete") {
                await deleteDoc(docRef);
            }
        } catch (e) {
            setError(e as Error);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        mutate,
        loading,
        error,
    };
}
