import type { Intervention } from "@/types/Types";
import { API_BASE_URL } from "@/lib/constants";
import useMutate from "@/engine/http/useMutate";

export function useUpdateInterventionLocal(interventionId: string) {
  return useMutate<Intervention, Intervention>(
    `${API_BASE_URL}/interventions/${interventionId}`,
    "PATCH",
  );
}

