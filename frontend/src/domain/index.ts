// Barrel file pour la couche métier

// Stats
export {
  useInterventionsStats,
  useLazyInterventionsStats,
} from "./stats/useInterventionsStats";
export { useClientsStats, useLazyClientsStats } from "./stats/useClientsStats";

// Clients
export { useClients } from "./clients/useClients";
export { useClientsFirestore, useUserFirestoreDoc, useClientsFirestoreMutation } from "./clients/useClientsFirestore";

// Interventions
export { useInterventions } from "./interventions/useInterventions";
export {
  useUpdateInterventionLocal,
} from "./interventions/useInterventionMutations";
export {
  useInterventionsFirestoreMutation,
  useInterventionFirestoreDoc,
} from "./interventions/useInterventionsFirestore";

// Auth
export {
  useLogin,
  useRegister,
  type AuthUser,
  type AuthResponse,
} from "./auth/useAuthApi";

// Sync
export {
  useSyncHistory,
  useSyncDetail,
  useLazySyncDetail,
  useStartSync,
} from "./sync/useSyncApi";

