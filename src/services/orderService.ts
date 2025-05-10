
import {
  getOrders,
  getOrderById,
  getUserOrders,
  createOrderFromCart,
  updateOrderStatus,
  Order
} from "../utils/localStorageDB";
import { toast } from "sonner";

// Order service with methods to manage orders
export const OrderService = {
  // Get all orders
  getAllOrders: (): Order[] => {
    return getOrders();
  },
  
  // Get order by ID
  getOrderById: (id: string): Order | undefined => {
    return getOrderById(id);
  },
  
  // Get orders for current user
  getUserOrders: (userId: string): Order[] => {
    return getUserOrders(userId);
  },
  
  // Create order from current cart
  checkout: (): Order | null => {
    const order = createOrderFromCart();
    
    if (order) {
      toast.success("Pedido realizado com sucesso!");
      return order;
    } else {
      toast.error("Não foi possível criar o pedido. Verifique seu carrinho.");
      return null;
    }
  },
  
  // Update order status
  updateStatus: (orderId: string, status: Order["status"]): Order | null => {
    const order = updateOrderStatus(orderId, status);
    
    if (order) {
      toast.success(`Status do pedido atualizado para: ${this.formatStatus(status)}`);
      return order;
    } else {
      toast.error("Pedido não encontrado.");
      return null;
    }
  },
  
  // Format status for display
  formatStatus: (status: Order["status"]): string => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "pago":
        return "Pago";
      case "entregue":
        return "Entregue";
      case "cancelado":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  }
};

export default OrderService;
