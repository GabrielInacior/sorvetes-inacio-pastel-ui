
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  nome: string;
  tipo: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

const CarrinhoPage = () => {
  const { toast } = useToast();
  // Mocked cart data - in a real application, this would come from a state management system
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      nome: "Sorvete de Chocolate Belga",
      tipo: "massa",
      preco: 15.90,
      imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quantidade: 2,
    },
    {
      id: "5",
      nome: "Sundae Tropical",
      tipo: "combinação",
      preco: 19.90, // Promotional price
      imagem: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quantidade: 1,
    },
  ]);
  
  // Calculate total
  const subtotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const delivery = 5.00;
  const total = subtotal + delivery;
  
  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantidade: newQuantity } : item
    ));
  };
  
  // Remove item
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removido",
      description: "O item foi removido do seu carrinho.",
    });
  };
  
  // Checkout
  const handleCheckout = () => {
    toast({
      title: "Pedido finalizado!",
      description: "Seu pedido foi realizado com sucesso. Em breve você receberá mais informações.",
    });
    
    // Clear cart
    setCartItems([]);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader title="Seu Carrinho" />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-sorbet-dark">Itens no Carrinho</h2>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden">
                        <img 
                          src={item.imagem} 
                          alt={item.nome} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg text-sorbet-dark">{item.nome}</h3>
                        <p className="text-gray-500 text-sm">{item.tipo}</p>
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                          <span className="font-medium">R$ {item.preco.toFixed(2)}</span>
                          
                          {/* Quantity */}
                          <div className="flex items-center">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                              className="h-8 w-8 rounded-full"
                            >
                              -
                            </Button>
                            <span className="mx-2 w-8 text-center">{item.quantidade}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                              className="h-8 w-8 rounded-full"
                            >
                              +
                            </Button>
                          </div>
                          
                          {/* Remove Button */}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link to="/cardapio">
                  <Button variant="link" className="text-sorbet-orange hover:text-sorbet-orange/80 p-0">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-sorbet-dark">Resumo do Pedido</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de Entrega:</span>
                    <span className="font-medium">R$ {delivery.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-sorbet-dark">Total:</span>
                      <span className="text-sorbet-dark">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-8 bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark py-6"
                >
                  Finalizar Compra
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sorbet-peach rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-sorbet-orange" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-sorbet-dark">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho.
            </p>
            <Link to="/cardapio">
              <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark py-6 px-8">
                Explorar Cardápio
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CarrinhoPage;
