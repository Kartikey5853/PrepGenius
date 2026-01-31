import React, { createContext, useContext, useState, ReactNode } from "react";
import api from "@/lib/axios";

interface User {
  user_id: string;
  name?: string; // optional for now (we can fetch profile later)
}

interface AuthContextType {
  user: User | null;
  login: (user_id: string, password: string) => Promise<boolean>;
  register: (
    user_id: string,
    password: string,
    name: string,
    whatsapp: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ---------------- LOGIN ----------------

  const login = async (user_id: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post("/auth/login", {
        user_id,
        password,
      });

      const token = res.data.access_token;

      // Save token
      localStorage.setItem("token", token);

      // Save user basic info (for UI use)
      const userData = { user_id };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // ---------------- REGISTER ----------------

  const register = async (
    user_id: string,
    password: string,
    name: string,
    whatsapp: string
  ): Promise<boolean> => {
    try {
      const res = await api.post("/auth/register", {
        user_id,
        password,
        name,
        whatsapp,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const userData = { user_id, name };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  // ---------------- LOGOUT ----------------

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
