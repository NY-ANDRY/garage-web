import type { ApiResponse, PaginatedResponse } from "@/types/Types";
import type { RepairBackoffice } from "@/types/BackofficeTypes";
import { API_BASE_URL } from "@/lib/constants";
import useFetch from "@/engine/http/useFetch";

export function useReparationsBackoffice(limit?: number, page: number = 1, search?: string) {
  const url = `${API_BASE_URL}/reparations?page=${page}${limit ? `&limit=${limit}` : ""}${search ? `&search=${search}` : ""}`;
  return useFetch<PaginatedResponse<RepairBackoffice[]>>(url);
}
