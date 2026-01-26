import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        const headers: HeadersInit = {
          'Accept': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          signal: abortController.signal,
          headers
        });

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
        }
        // setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;