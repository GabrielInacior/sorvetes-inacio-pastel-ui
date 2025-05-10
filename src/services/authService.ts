
import { login as dbLogin, logout as dbLogout, getCurrentUser, User, UserType } from "../utils/localStorageDB";
import { toast } from "sonner";

// Auth service with methods to manage user authentication
export const AuthService = {
  // Login function
  login: (email: string, senha: string): User | null => {
    const user = dbLogin(email, senha);
    
    if (user) {
      toast.success("Login realizado com sucesso!");
      return user;
    } else {
      toast.error("E-mail ou senha inválidos. Tente novamente.");
      return null;
    }
  },
  
  // Logout function
  logout: (): void => {
    dbLogout();
    toast.info("Sessão encerrada.");
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return getCurrentUser() !== null;
  },
  
  // Get current user information
  getCurrentUser: (): User | null => {
    return getCurrentUser();
  },
  
  // Check if current user has a specific role
  hasRole: (role: UserType): boolean => {
    const user = getCurrentUser();
    if (!user) return false;
    
    if (role === "administrador") {
      return user.tipo === "administrador";
    } else if (role === "funcionario") {
      // Admin can do everything a funcionario can
      return user.tipo === "funcionario" || user.tipo === "administrador";
    } else if (role === "cliente") {
      // Everyone can do what a cliente can do
      return true;
    }
    
    return false;
  },
  
  // Check if current user is admin
  isAdmin: (): boolean => {
    return this.hasRole("administrador");
  },
};

export default AuthService;
