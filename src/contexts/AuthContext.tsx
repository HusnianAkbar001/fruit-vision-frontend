import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { loginUser, registerUser, logoutUser } from "../api/api";
import { useToast } from "@/hooks/use-toast";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If we have a token, we'll assume the user is authenticated
      // In a real app, you might want to validate the token with the server
      const username = localStorage.getItem("username");
      setUser({ username: username || "User" });
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      if (response.token) {
        localStorage.setItem("username", username);
        setUser({ username });
        toast({
          title: "Success",
          description: "You have been logged in successfully!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string, email: string) => {
    setIsLoading(true);
    try {
      console.log("Registering user:", { username, email });
      await registerUser(username, password, email);
      toast({
        title: "Success",
        description: "Registration successful! Please login.",
      });
    } catch (error: any) {
      console.error("Registration error in context:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem("username");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
