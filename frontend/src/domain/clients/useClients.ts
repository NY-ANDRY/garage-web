import type { ApiResponse, User } from "@/types/Types";
import { API_BASE_URL } from "@/lib/constants";
import useFetch from "@/engine/http/useFetch";

export function useClients() {
  return useFetch<ApiResponse<User[]>>(`${API_BASE_URL}/clients`);
}

