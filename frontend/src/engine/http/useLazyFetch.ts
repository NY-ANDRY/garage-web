import { useState, useCallback } from "react";

export interface FetchState<TResponse, TError> {
  data: TResponse | null;
  isLoading: boolean;
  error: TError | null;
}

export interface FetchParams {
  [key: string]: string | number | boolean | undefined;
}

export default function useLazyFetch<TResponse>(baseUrl: string | null) {
  const [state, setState] = useState<FetchState<TResponse, Error>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetch = useCallback(
    async (params?: FetchParams) => {
      if (!baseUrl) return null;
      setState({ data: null, isLoading: true, error: null });

      try {
        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              queryParams.append(key, String(value));
            }
          });
        }

        const queryString = queryParams.toString();
        const url = `${baseUrl}${queryString ? `?${queryString}` : ""}`;

        const response = await window.fetch(url, {
          method: "GET",
          headers,
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
    [baseUrl],
  );

  return { ...state, fetch };
}

