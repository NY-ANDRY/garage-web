import type { ApiResponse, Synchronisation } from "@/types/Types";
import { API_BASE_URL } from "@/lib/constants";
import useFetch from "@/engine/http/useFetch";
import useLazyFetch from "@/engine/http/useLazyFetch";
import useMutate from "@/engine/http/useMutate";

export function useSyncHistory() {
  return useFetch<ApiResponse<Synchronisation[]>>(`${API_BASE_URL}/sync`);
}

export function useSyncDetail(id: number | string | null) {
  return useFetch<ApiResponse<Synchronisation>>(
    id ? `${API_BASE_URL}/sync/${id}` : null
  );
}

export function useLazySyncDetail(id: number | string | null) {
  return useLazyFetch<ApiResponse<Synchronisation>>(
    id ? `${API_BASE_URL}/sync/${id}` : null
  );
}

export function useStartSync() {
  return useMutate<ApiResponse<Synchronisation>, { date?: string; use_task?: boolean }>(
    `${API_BASE_URL}/sync`,
    "POST"
  );
}
