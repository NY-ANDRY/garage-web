import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [reload, setReload] = useState(0);

  const navigate = useNavigate();

  const refetch = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
          Accept: "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          signal: abortController.signal,
          headers,
        });

        if (response.status === 401) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          navigate("/backoffice/auth", { replace: true });
          throw new Error(`unauthorize`);
        }

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url, reload]);

  return { data, isLoading, error, refetch };
}

export default useFetch;
