
// Order service with methods to manage orders
import { toast } from "sonner";
import { ProductProps } from "@/components/ui/ProductCard";
import { CartService } from "./cartService";
import { AuthService } from "./authService";

// Interface for Order
export interface Order {
  id: string;
  clientId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  status: 'pendente' | 'em_preparo' | 'pronto' | 'entregue' | 'cancelado';
  total: number;
  createdAt: string;
}

// Get orders from localStorage
const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

// Save orders to localStorage
const saveOrders = (orders: Order[]): void => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Order service with methods to manage orders
export const OrderService = {
  // Get all orders
  getAllOrders: (): Order[] => {
    return getOrders();
  },
  
  // Get orders by client ID
  getOrdersByClientId: (clientId: string): Order[] => {
    return getOrders().filter(order => order.clientId === clientId);
  },
  
  // Get order by ID
  getOrderById: (id: string): Order | undefined => {
    return getOrders().find(order => order.id === id);
  },
  
  // Create new order
  createOrder: (clientId: string, items: {productId: string; quantity: number; price: number; name: string;}[]): Order => {
    const newOrder: Order = {
      id: Date.now().toString(),
      clientId,
      items,
      status: 'pendente',
      total: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      createdAt: new Date().toISOString()
    };
    
    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);
    
    toast.success("Pedido criado com sucesso!");
    return newOrder;
  },
  
  // Update order status
  updateOrderStatus: (id: string, status: Order['status']): Order | undefined => {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      toast.error("Pedido não encontrado!");
      return undefined;
    }
    
    orders[orderIndex].status = status;
    saveOrders(orders);
    
    toast.success(`Status do pedido atualizado para: ${status}`);
    return orders[orderIndex];
  },
  
  // Cancel order
  cancelOrder: (id: string): boolean => {
    return OrderService.updateOrderStatus(id, 'cancelado') !== undefined;
  },
  
  // Get orders by status
  getOrdersByStatus: (status: Order['status']): Order[] => {
    return getOrders().filter(order => order.status === status);
  },

  // Process checkout from cart
  checkout: (): Order | undefined => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return undefined;
    }

    const cart = CartService.getCart();
    if (cart.items.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return undefined;
    }

    // Format cart items for order
    const orderItems = cart.items.map(item => ({
      productId: item.produto.id,
      quantity: item.quantidade,
      price: item.produto.precoPromocional || item.produto.preco,
      name: item.produto.nome
    }));

    // Create the order
    const order = OrderService.createOrder(currentUser.id, orderItems);

    // Clear the cart after successful order creation
    CartService.clearCart();
    
    toast.success("Pedido realizado com sucesso!");
    return order;
  }
};

export default OrderService;
