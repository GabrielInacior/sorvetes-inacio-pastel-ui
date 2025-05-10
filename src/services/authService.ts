
// Authentication service with methods to manage user authentication
import { toast } from "sonner";

// Interface for User
export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: 'cliente' | 'funcionario' | 'administrador';
  dataCriacao: string;
}

// Get users from localStorage
const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Current user session
let currentUser: User | null = null;

// Initialize authentication state from localStorage (if available)
const initAuthState = (): void => {
  const sessionData = localStorage.getItem('session');
  if (sessionData) {
    try {
      currentUser = JSON.parse(sessionData);
    } catch (e) {
      localStorage.removeItem('session');
      currentUser = null;
    }
  }
};

// Authentication service with methods to manage user authentication
export const AuthService = {
  // Initialize auth state on load
  init: (): void => {
    initAuthState();
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    return currentUser;
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return currentUser !== null;
  },
  
  // Login user
  login: (email: string, senha: string): User | null => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      currentUser = user;
      localStorage.setItem('session', JSON.stringify(user));
      toast.success(`Bem-vindo(a), ${user.nome}!`);
      return user;
    } else {
      toast.error("Email ou senha incorretos.");
      return null;
    }
  },
  
  // Logout user
  logout: (): void => {
    currentUser = null;
    localStorage.removeItem('session');
    toast.info("Você saiu da sua conta.");
  },
  
  // Register new user
  register: (nome: string, email: string, senha: string, tipo: User['tipo'] = 'cliente'): User | null => {
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      toast.error("Este email já está em uso.");
      return null;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
      tipo,
      dataCriacao: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Automatically login the new user
    currentUser = newUser;
    localStorage.setItem('session', JSON.stringify(newUser));
    
    toast.success("Conta criada com sucesso!");
    return newUser;
  },
  
  // Update user profile
  updateProfile: (userId: string, updates: Partial<Omit<User, 'id' | 'tipo'>>): User | null => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      toast.error("Usuário não encontrado.");
      return null;
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...updates
    };
    
    saveUsers(users);
    
    // Update current user if it's the same user
    if (currentUser && currentUser.id === userId) {
      currentUser = users[userIndex];
      localStorage.setItem('session', JSON.stringify(currentUser));
    }
    
    toast.success("Perfil atualizado com sucesso!");
    return users[userIndex];
  },
  
  // Change password
  changePassword: (userId: string, currentPassword: string, newPassword: string): boolean => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      toast.error("Usuário não encontrado.");
      return false;
    }
    
    if (users[userIndex].senha !== currentPassword) {
      toast.error("Senha atual incorreta.");
      return false;
    }
    
    users[userIndex].senha = newPassword;
    saveUsers(users);
    
    toast.success("Senha alterada com sucesso!");
    return true;
  },
  
  // Delete user account
  deleteAccount: (userId: string, password: string): boolean => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      toast.error("Usuário não encontrado.");
      return false;
    }
    
    if (users[userIndex].senha !== password) {
      toast.error("Senha incorreta.");
      return false;
    }
    
    users.splice(userIndex, 1);
    saveUsers(users);
    
    // Logout if it's the current user
    if (currentUser && currentUser.id === userId) {
      AuthService.logout();
    }
    
    toast.success("Conta excluída com sucesso.");
    return true;
  },
  
  // Get all users (admin only)
  getAllUsers: (): User[] | null => {
    if (currentUser && currentUser.tipo === 'administrador') {
      return getUsers();
    } else {
      toast.error("Permissão negada.");
      return null;
    }
  }
};

// Initialize auth state when the service is first imported
initAuthState();

export default AuthService;
