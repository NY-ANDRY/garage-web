import { useCallback } from "react";


export const useUrlSegment = () => {
    const replaceSegment = useCallback((id: string, nbSeg: number) => {
        const url = new URL(window.location.href);
        const segments = url.pathname.split("/").filter(Boolean);

        if (segments.length === nbSeg) {
            segments.push(id);
        } else {
            throw new Error('invalid segment number');
        }

        const newPath = "/" + segments.join("/");
        window.history.replaceState(null, "", newPath);
    }, []);

    return { replaceSegment };
};
