
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, getCurrentUser, login as dbLogin, logout as dbLogout } from "@/utils/localStorageDB";
import { toast } from "sonner";

// Define the context type
interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    const user = dbLogin(email, password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      toast.success("Login realizado com sucesso!");
      return true;
    } else {
      toast.error("E-mail ou senha inválidos.");
      return false;
    }
  };
  
  // Logout function
  const logout = (): void => {
    dbLogout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    toast.info("Sessão encerrada.");
  };
  
  // Check if current user is admin
  const isAdmin = (): boolean => {
    return currentUser?.tipo === "administrador";
  };
  
  // Check if current user is employee or admin
  const isEmployee = (): boolean => {
    return currentUser?.tipo === "funcionario" || currentUser?.tipo === "administrador";
  };
  
  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    isEmployee,
    isAuthenticated
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
