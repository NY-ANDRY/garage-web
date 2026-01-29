import { API_BASE_URL } from "@/lib/constants";
import useMutate from "@/engine/http/useMutate";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  access_token: string;
  user: AuthUser;
};

export function useLogin() {
  return useMutate<AuthResponse, { email: string; password: string }>(
    `${API_BASE_URL}/login`,
    "POST",
  );
}

export function useRegister() {
  return useMutate<
    AuthResponse,
    { name: string; email: string; password: string; password_confirmation?: string }
  >(`${API_BASE_URL}/register`, "POST");
}

