import type { ApiResponse, Intervention } from "@/types/Types";
import { API_BASE_URL } from "@/lib/constants";
import useFetch from "@/engine/http/useFetch";

export function useInterventions() {
  return useFetch<ApiResponse<Intervention[]>>(`${API_BASE_URL}/interventions`);
}

