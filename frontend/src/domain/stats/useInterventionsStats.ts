import { useCallback } from "react";
import type { ApiResponse, StatsInterventions } from "@/types/Types";
import { API_BASE_URL } from "@/lib/constants";
import useFetch from "@/engine/http/useFetch";
import useLazyFetch, { type FetchParams } from "@/engine/http/useLazyFetch";

export function useInterventionsStats() {
  return useFetch<ApiResponse<StatsInterventions>>(
    `${API_BASE_URL}/stats/interventions`,
  );
}

export function useLazyInterventionsStats() {
  const { fetch, ...state } = useLazyFetch<ApiResponse<StatsInterventions>>(
    `${API_BASE_URL}/stats/interventions`,
  );

  const fetchStats = useCallback(
    (params?: FetchParams) => fetch(params),
    [fetch],
  );

  return { ...state, fetchStats };
}

