
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartTotal,
  getCartItemsCount,
  getProductById,
  Cart,
  CartItem
} from "../utils/localStorageDB";
import { toast } from "sonner";
import { ProductProps } from "@/components/ui/ProductCard";

// Extended cart item with product details
export interface CartItemWithProduct extends CartItem {
  produto: ProductProps;
  subtotal: number;
}

// Cart service with methods to manage shopping cart
export const CartService = {
  // Get cart with product details
  getCart: (): { items: CartItemWithProduct[], total: number } => {
    const cart = getCart();
    
    if (!cart) {
      return { items: [], total: 0 };
    }
    
    // Map cart items to include product details
    const itemsWithProducts = cart.items
      .map(item => {
        const product = getProductById(item.produtoId);
        if (!product) return null;
        
        const price = product.precoPromocional || product.preco;
        return {
          ...item,
          produto: product,
          subtotal: price * item.quantidade
        };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
    
    const total = itemsWithProducts.reduce((sum, item) => sum + item.subtotal, 0);
    
    return { items: itemsWithProducts, total };
  },
  
  // Add product to cart
  addToCart: (productId: string, quantity: number = 1): void => {
    const product = getProductById(productId);
    if (!product) {
      toast.error("Produto não encontrado.");
      return;
    }
    
    addToCart(productId, quantity);
    toast.success("Produto adicionado ao carrinho!");
  },
  
  // Remove product from cart
  removeFromCart: (productId: string): void => {
    removeFromCart(productId);
    toast.info("Produto removido do carrinho.");
  },
  
  // Update product quantity
  updateQuantity: (productId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(productId);
      toast.info("Produto removido do carrinho.");
    } else {
      updateCartItemQuantity(productId, quantity);
    }
  },
  
  // Clear cart
  clearCart: (): void => {
    clearCart();
    toast.info("Carrinho limpo.");
  },
  
  // Get cart total
  getTotal: (): number => {
    return getCartTotal();
  },
  
  // Get total items count in cart
  getItemsCount: (): number => {
    return getCartItemsCount();
  }
};

export default CartService;
