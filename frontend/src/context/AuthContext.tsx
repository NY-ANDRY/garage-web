import { createContext, useState, useCallback, type ReactNode } from "react";
import { API_BASE_URL } from "@/lib/constants";
import useMutate from "@/hooks/useMutate";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: Error | null;
  registerError: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      console.error("Failed to parse auth_user from localStorage");
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("auth_token"),
  );

  const { mutate: loginMutate, isLoading: loginLoading, error: loginError } = useMutate<{ access_token: string; user: User }, any>(`${API_BASE_URL}/login`);
  const { mutate: registerMutate, isLoading: registerLoading, error: registerError } = useMutate<{ access_token: string; user: User }, any>(`${API_BASE_URL}/register`);

  const saveToken = useCallback((data: { access_token: string; user: User }) => {
    setToken(data.access_token);
    setUser(data.user);

    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginMutate({ email, password });
    saveToken(data);
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const data = await registerMutate(payload);
    saveToken(data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        loginLoading,
        registerLoading,
        loginError,
        registerError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
