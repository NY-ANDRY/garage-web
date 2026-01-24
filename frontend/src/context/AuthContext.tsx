import { createContext, useContext, useState, type ReactNode } from "react";
import { API_BASE_URL } from "@/lib/constants";

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
}
  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse auth_user from localStorage");
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("auth_token"),
  );

  const saveToken = (data: any) => {
    console.log("-" + data);
    
    setToken(data.access_token);
    setUser(data.user);

    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Invalid credentials");
    }
    
    const data = await response.json();

    saveToken(data);
  };

  // ✅ REGISTER (déjà clean)
  const register = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();

    saveToken(data);
  };

  // ✅ LOGOUT CENTRALISÉ
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
