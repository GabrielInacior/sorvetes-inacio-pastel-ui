
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { CartService } from "@/services/cartService";
import { useAuth } from "@/components/auth/AuthProvider";
import { OrderService } from "@/services/orderService";

const CarrinhoPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Load cart on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  // Load cart from service
  const loadCart = () => {
    setIsLoading(true);
    const cartData = CartService.getCart();
    setCart(cartData);
    setIsLoading(false);
  };
  
  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    CartService.updateQuantity(productId, newQuantity);
    loadCart();
  };
  
  // Handle remove from cart
  const handleRemoveItem = (productId: string) => {
    CartService.removeFromCart(productId);
    loadCart();
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const order = OrderService.checkout();
      
      if (order) {
        // Clear cart and reload
        loadCart();
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader title="Carrinho de Compras" />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <p>Carregando carrinho...</p>
          </div>
        ) : !isAuthenticated ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-sorbet-dark mb-2">Faça login para ver seu carrinho</h2>
            <p className="text-gray-600 mb-6">
              Você precisa estar logado para adicionar produtos ao carrinho e finalizar compras
            </p>
            <Button 
              onClick={() => navigate("/login")}
              className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark"
            >
              Fazer Login
            </Button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-sorbet-dark mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">
              Adicione alguns produtos deliciosos ao seu carrinho
            </p>
            <Button 
              asChild
              className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark"
            >
              <Link to="/cardapio">Ver Cardápio</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-sorbet-dark">
                    Itens do Carrinho ({cart.items.length})
                  </h2>
                  
                  <div className="divide-y">
                    {cart.items.map((item) => (
                      <div key={item.produto.id} className="py-4 flex items-center">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.produto.imagem} 
                            alt={item.produto.nome} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium text-sorbet-dark">
                            {item.produto.nome}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.produto.tipo === "massa" && "Sorvete de Massa"}
                            {item.produto.tipo === "casquinha" && "Casquinha"}
                            {item.produto.tipo === "quilo" && "Por Quilo"}
                            {item.produto.tipo === "combinação" && "Combinação"}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            {/* Price */}
                            <span className="font-medium text-sorbet-dark">
                              R$ {(item.produto.precoPromocional || item.produto.preco).toFixed(2)}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleQuantityChange(item.produto.id, item.quantidade - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <span className="px-4 font-medium">{item.quantidade}</span>
                              
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleQuantityChange(item.produto.id, item.quantidade + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-4 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleRemoveItem(item.produto.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-sorbet-dark">
                    Resumo do Pedido
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">R$ {cart.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frete:</span>
                      <span className="font-medium">Grátis</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-sorbet-dark">Total:</span>
                        <span className="text-lg font-bold text-sorbet-dark">R$ {cart.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark mt-4"
                      onClick={handleCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processando..." : "Finalizar Compra"}
                    </Button>
                    
                    <Button
                      variant="outline"
                      asChild
                      className="w-full"
                    >
                      <Link to="/cardapio">Continuar Comprando</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CarrinhoPage;
