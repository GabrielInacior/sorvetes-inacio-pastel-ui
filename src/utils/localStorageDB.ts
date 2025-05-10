import { ProductProps } from "@/components/ui/ProductCard";
import { produtos } from "@/data/produtos";

// Types for our data model
export type UserType = "cliente" | "funcionario" | "administrador";

export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string; // plaintext for simulation only
  tipo: UserType;
  dataCriacao: string;
}

export interface Message {
  id: string;
  nome: string;
  email: string;
  mensagem: string;
  dataEnvio: string;
  lido: boolean;
}

export interface CartItem {
  produtoId: string;
  quantidade: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

export interface Promotion {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  tipoDesconto: "percentual" | "fixo";
  valorDesconto: number;
  produtoId?: string; // Optional - for product-specific promos
}

export interface OrderItem {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pendente" | "pago" | "entregue" | "cancelado";
  dataCriacao: string;
}

// In-memory cache
let currentUser: User | null = null;
let productsCache: ProductProps[] = [];
let usersCache: User[] = [];
let messagesCache: Message[] = [];
let promotionsCache: Promotion[] = [];
let ordersCache: Order[] = [];

// Initialize data if localStorage is empty
export const initializeData = () => {
  // Initialize products if not exists
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(produtos));
  }
  
  // Initialize users with default admin and employee if not exists
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      {
        id: "1",
        nome: "Administrador",
        email: "admin@sorvetesinacio.com",
        senha: "admin123",
        tipo: "administrador",
        dataCriacao: new Date().toISOString(),
      },
      {
        id: "2",
        nome: "Funcionário",
        email: "funcionario@sorvetesinacio.com",
        senha: "func123",
        tipo: "funcionario",
        dataCriacao: new Date().toISOString(),
      }
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  } else {
    // Check if default users exist, if not add them
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const hasAdmin = users.some((user: User) => user.email === "admin@sorvetesinacio.com");
    const hasEmployee = users.some((user: User) => user.email === "funcionario@sorvetesinacio.com");
    
    if (!hasAdmin || !hasEmployee) {
      const defaultUsers = [
        {
          id: "1",
          nome: "Administrador",
          email: "admin@sorvetesinacio.com",
          senha: "admin123",
          tipo: "administrador",
          dataCriacao: new Date().toISOString(),
        },
        {
          id: "2",
          nome: "Funcionário",
          email: "funcionario@sorvetesinacio.com",
          senha: "func123",
          tipo: "funcionario",
          dataCriacao: new Date().toISOString(),
        }
      ];
      
      // Add only missing default users
      if (!hasAdmin) users.push(defaultUsers[0]);
      if (!hasEmployee) users.push(defaultUsers[1]);
      
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
  
  // Initialize other data if not exists
  if (!localStorage.getItem("messages")) {
    localStorage.setItem("messages", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("promotions")) {
    localStorage.setItem("promotions", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
  }
  
  // Refresh caches
  refreshCaches();
};

// Refresh all in-memory caches from localStorage
export const refreshCaches = () => {
  const productsData = localStorage.getItem("products");
  if (productsData) {
    productsCache = JSON.parse(productsData);
  }
  
  const usersData = localStorage.getItem("users");
  if (usersData) {
    usersCache = JSON.parse(usersData);
  }
  
  const messagesData = localStorage.getItem("messages");
  if (messagesData) {
    messagesCache = JSON.parse(messagesData);
  }
  
  const promotionsData = localStorage.getItem("promotions");
  if (promotionsData) {
    promotionsCache = JSON.parse(promotionsData);
  }
  
  const ordersData = localStorage.getItem("orders");
  if (ordersData) {
    ordersCache = JSON.parse(ordersData);
  }
  
  // Check for a session
  const sessionData = localStorage.getItem("session");
  if (sessionData) {
    currentUser = JSON.parse(sessionData);
  }
};

// User related functions
export const getUsers = (): User[] => {
  return usersCache;
};

export const getUserById = (id: string): User | undefined => {
  return usersCache.find(user => user.id === id);
};

export const saveUser = (user: User): void => {
  // Check if user exists
  const index = usersCache.findIndex(u => u.id === user.id);
  
  if (index >= 0) {
    // Update existing user
    usersCache[index] = user;
  } else {
    // Add new user with generated ID
    if (!user.id) {
      user.id = Date.now().toString();
    }
    if (!user.dataCriacao) {
      user.dataCriacao = new Date().toISOString();
    }
    usersCache.push(user);
  }
  
  // Update localStorage
  localStorage.setItem("users", JSON.stringify(usersCache));
};

export const deleteUser = (id: string): void => {
  usersCache = usersCache.filter(user => user.id !== id);
  localStorage.setItem("users", JSON.stringify(usersCache));
};

// Authentication functions
export const login = (email: string, senha: string): User | null => {
  const user = usersCache.find(
    user => user.email === email && user.senha === senha
  );
  
  if (user) {
    // Set current user in memory and localStorage
    currentUser = user;
    localStorage.setItem("session", JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("session");
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const isLoggedIn = (): boolean => {
  return currentUser !== null;
};

export const hasRole = (role: UserType): boolean => {
  if (!currentUser) return false;
  return currentUser.tipo === role;
};

export const isAdmin = (): boolean => {
  return hasRole("administrador");
};

export const isEmployee = (): boolean => {
  return hasRole("funcionario") || isAdmin();
};

// Products related functions
export const getProducts = (): ProductProps[] => {
  return productsCache;
};

export const getProductById = (id: string): ProductProps | undefined => {
  return productsCache.find(product => product.id === id);
};

export const getProductsByType = (tipo: ProductProps["tipo"]): ProductProps[] => {
  return productsCache.filter(product => product.tipo === tipo);
};

export const getPromotionalProducts = (): ProductProps[] => {
  return productsCache.filter(product => product.promocao);
};

export const saveProduct = (product: ProductProps): void => {
  // Check if product exists
  const index = productsCache.findIndex(p => p.id === product.id);
  
  if (index >= 0) {
    // Update existing product
    productsCache[index] = product;
  } else {
    // Add new product with generated ID
    if (!product.id) {
      product.id = Date.now().toString();
    }
    productsCache.push(product);
  }
  
  // Update localStorage
  localStorage.setItem("products", JSON.stringify(productsCache));
};

export const deleteProduct = (id: string): void => {
  productsCache = productsCache.filter(product => product.id !== id);
  localStorage.setItem("products", JSON.stringify(productsCache));
};

// Cart related functions
export const getCart = (userId?: string): Cart | null => {
  const userToCheck = userId || (currentUser ? currentUser.id : null);
  if (!userToCheck) return null;
  
  const cartKey = `cart_${userToCheck}`;
  const cartData = localStorage.getItem(cartKey);
  
  if (cartData) {
    return JSON.parse(cartData);
  }
  
  // Return empty cart if none exists
  return {
    userId: userToCheck,
    items: [],
    updatedAt: new Date().toISOString(),
  };
};

export const addToCart = (productId: string, quantity: number = 1): Cart | null => {
  if (!currentUser) return null;
  
  const cart = getCart() || {
    userId: currentUser.id,
    items: [],
    updatedAt: new Date().toISOString(),
  };
  
  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.produtoId === productId
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity of existing item
    cart.items[existingItemIndex].quantidade += quantity;
  } else {
    // Add new item
    cart.items.push({
      produtoId: productId,
      quantidade: quantity,
    });
  }
  
  cart.updatedAt = new Date().toISOString();
  
  // Save to localStorage
  localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
  
  return cart;
};

export const removeFromCart = (productId: string): Cart | null => {
  if (!currentUser) return null;
  
  const cart = getCart();
  if (!cart) return null;
  
  // Remove the item from the cart
  cart.items = cart.items.filter(item => item.produtoId !== productId);
  cart.updatedAt = new Date().toISOString();
  
  // Save to localStorage
  localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
  
  return cart;
};

export const updateCartItemQuantity = (productId: string, quantity: number): Cart | null => {
  if (!currentUser) return null;
  
  const cart = getCart();
  if (!cart) return null;
  
  // Find the item
  const itemIndex = cart.items.findIndex(item => item.produtoId === productId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is zero or less
      cart.items = cart.items.filter(item => item.produtoId !== productId);
    } else {
      // Update quantity
      cart.items[itemIndex].quantidade = quantity;
    }
    
    cart.updatedAt = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
  }
  
  return cart;
};

export const clearCart = (): void => {
  if (!currentUser) return;
  localStorage.removeItem(`cart_${currentUser.id}`);
};

export const getCartItemsCount = (): number => {
  const cart = getCart();
  if (!cart) return 0;
  
  return cart.items.reduce((total, item) => total + item.quantidade, 0);
};

export const getCartTotal = (): number => {
  const cart = getCart();
  if (!cart) return 0;
  
  return cart.items.reduce((total, item) => {
    const product = getProductById(item.produtoId);
    if (!product) return total;
    
    const price = product.precoPromocional || product.preco;
    return total + (price * item.quantidade);
  }, 0);
};

// Promotion related functions
export const getPromotions = (): Promotion[] => {
  return promotionsCache;
};

export const getActivePromotions = (): Promotion[] => {
  const now = new Date();
  
  return promotionsCache.filter(promo => {
    const startDate = new Date(promo.dataInicio);
    const endDate = new Date(promo.dataFim);
    return startDate <= now && now <= endDate;
  });
};

export const savePromotion = (promotion: Promotion): void => {
  // Check if promotion exists
  const index = promotionsCache.findIndex(p => p.id === promotion.id);
  
  if (index >= 0) {
    // Update existing promotion
    promotionsCache[index] = promotion;
  } else {
    // Add new promotion with generated ID
    if (!promotion.id) {
      promotion.id = Date.now().toString();
    }
    promotionsCache.push(promotion);
  }
  
  // Update localStorage
  localStorage.setItem("promotions", JSON.stringify(promotionsCache));
};

export const deletePromotion = (id: string): void => {
  promotionsCache = promotionsCache.filter(promotion => promotion.id !== id);
  localStorage.setItem("promotions", JSON.stringify(promotionsCache));
};

// Message related functions
export const getMessages = (): Message[] => {
  return messagesCache;
};

export const saveMessage = (message: Message): void => {
  if (!message.id) {
    message.id = Date.now().toString();
  }
  if (!message.dataEnvio) {
    message.dataEnvio = new Date().toISOString();
  }
  if (message.lido === undefined) {
    message.lido = false;
  }
  
  messagesCache.push(message);
  localStorage.setItem("messages", JSON.stringify(messagesCache));
};

export const markMessageAsRead = (id: string): void => {
  const messageIndex = messagesCache.findIndex(m => m.id === id);
  if (messageIndex >= 0) {
    messagesCache[messageIndex].lido = true;
    localStorage.setItem("messages", JSON.stringify(messagesCache));
  }
};

export const deleteMessage = (id: string): void => {
  messagesCache = messagesCache.filter(message => message.id !== id);
  localStorage.setItem("messages", JSON.stringify(messagesCache));
};

// Order related functions
export const getOrders = (): Order[] => {
  return ordersCache;
};

export const getOrderById = (id: string): Order | undefined => {
  return ordersCache.find(order => order.id === id);
};

export const getUserOrders = (userId: string): Order[] => {
  return ordersCache.filter(order => order.userId === userId);
};

export const createOrderFromCart = (): Order | null => {
  if (!currentUser) return null;
  
  const cart = getCart();
  if (!cart || cart.items.length === 0) return null;
  
  const orderItems: OrderItem[] = [];
  let total = 0;
  
  // Convert cart items to order items
  for (const item of cart.items) {
    const product = getProductById(item.produtoId);
    if (!product) continue;
    
    const price = product.precoPromocional || product.preco;
    
    orderItems.push({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoUnitario: price,
    });
    
    total += price * item.quantidade;
  }
  
  if (orderItems.length === 0) return null;
  
  const order: Order = {
    id: Date.now().toString(),
    userId: currentUser.id,
    items: orderItems,
    total,
    status: "pendente",
    dataCriacao: new Date().toISOString(),
  };
  
  // Save the order
  ordersCache.push(order);
  localStorage.setItem("orders", JSON.stringify(ordersCache));
  
  // Clear the cart
  clearCart();
  
  return order;
};

export const updateOrderStatus = (orderId: string, status: Order["status"]): Order | null => {
  const orderIndex = ordersCache.findIndex(order => order.id === orderId);
  if (orderIndex < 0) return null;
  
  ordersCache[orderIndex].status = status;
  localStorage.setItem("orders", JSON.stringify(ordersCache));
  
  return ordersCache[orderIndex];
};

// Statistics and analytics functions
export const getStats = () => {
  const totalProducts = productsCache.length;
  const totalUsers = usersCache.length;
  const totalOrders = ordersCache.length;
  
  // Calculate total revenue from all paid orders
  const totalRevenue = ordersCache
    .filter(order => order.status === "pago" || order.status === "entregue")
    .reduce((total, order) => total + order.total, 0);
  
  // Calculate product popularity
  const productPopularity: Record<string, number> = {};
  
  ordersCache.forEach(order => {
    order.items.forEach(item => {
      if (!productPopularity[item.produtoId]) {
        productPopularity[item.produtoId] = 0;
      }
      productPopularity[item.produtoId] += item.quantidade;
    });
  });
  
  // Sort by popularity
  const topProducts = Object.entries(productPopularity)
    .map(([produtoId, quantidade]) => {
      const product = getProductById(produtoId);
      return {
        id: produtoId,
        nome: product ? product.nome : "Produto Desconhecido",
        quantidade,
      };
    })
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5); // Top 5
  
  return {
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue,
    topProducts,
  };
};

// Initialize data on module load
initializeData();
