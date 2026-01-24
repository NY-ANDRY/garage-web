import { useState, useCallback } from 'react';

interface MutationState<TResponse, TError> {
  data: TResponse | null;
  isLoading: boolean;
  error: TError | null;
}

function useMutation<TResponse, TVariables>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) {
  const [state, setState] = useState<MutationState<TResponse, Error>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState({ data: null, isLoading: true, error: null });

      try {
        const token = localStorage.getItem('auth_token');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(variables),
        });

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const result = await response.json();
        setState({ data: result, isLoading: false, error: null });
        return result;
      } catch (err) {
        const error = err as Error;
        setState({ data: null, isLoading: false, error });
        throw error;
      }
    },
    [url, method]
  );

  return { ...state, mutate };
}

export default useMutation;