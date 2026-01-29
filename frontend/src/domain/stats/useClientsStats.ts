import { useCallback } from "react";
import type { ApiResponse, StatsClients } from "@/types/Types";
import { API_BASE_URL } from "@/lib/constants";
import useFetch from "@/engine/http/useFetch";
import useLazyFetch, { type FetchParams } from "@/engine/http/useLazyFetch";

export function useClientsStats() {
  return useFetch<ApiResponse<StatsClients>>(`${API_BASE_URL}/stats/clients`);
}

export function useLazyClientsStats() {
  const { fetch, ...state } = useLazyFetch<ApiResponse<StatsClients>>(
    `${API_BASE_URL}/stats/clients`,
  );

  const fetchStats = useCallback(
    (params?: FetchParams) => fetch(params),
    [fetch],
  );

  return { ...state, fetchStats };
}

