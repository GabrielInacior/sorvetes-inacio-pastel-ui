
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { ProductService } from "@/services/productService";
import { CartService } from "@/services/cartService";
import { ProductProps } from "@/components/ui/ProductCard";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

const ProdutoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);
  
  // Load product data
  useEffect(() => {
    if (id) {
      // Get product by ID
      const productData = ProductService.getProductById(id);
      setProduct(productData || null);
      setIsLoading(false);
      
      // If product exists, get related products of the same type
      if (productData) {
        const related = ProductService.getProductsByType(productData.tipo)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  // Handle quantity change
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      toast.error("Faça login para adicionar produtos ao carrinho.");
      return;
    }
    
    CartService.addToCart(product.id, quantity);
  };
  
  // Format price display
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2)}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            Carregando produto...
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sorbet-dark mb-4">
              Produto não encontrado
            </h2>
            <p className="text-gray-600 mb-8">
              O produto que você está procurando não está disponível.
            </p>
            <Button asChild className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
              <Link to="/cardapio">Ver Cardápio</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <Button
          variant="ghost"
          asChild
          className="mb-8 flex items-center text-sorbet-dark hover:text-sorbet-orange"
        >
          <Link to="/cardapio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao cardápio
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden h-[400px]">
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-sorbet-peach px-3 py-1 rounded-full text-sm text-sorbet-dark mb-2">
                {product.tipo === 'massa' && 'Sorvete de Massa'}
                {product.tipo === 'casquinha' && 'Casquinha'}
                {product.tipo === 'quilo' && 'Por Quilo'}
                {product.tipo === 'combinação' && 'Combinação'}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-sorbet-dark mb-2">
                {product.nome}
              </h1>
              
              <div className="flex items-center space-x-2 mb-4">
                {product.promocao && product.precoPromocional ? (
                  <>
                    <span className="line-through text-gray-400 text-lg">
                      {formatPrice(product.preco)}
                    </span>
                    <span className="font-bold text-2xl md:text-3xl text-sorbet-dark">
                      {formatPrice(product.precoPromocional)}
                    </span>
                    <span className="bg-sorbet-pink text-sorbet-dark font-bold px-2 py-1 rounded text-sm">
                      Promoção
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-2xl md:text-3xl text-sorbet-dark">
                    {formatPrice(product.preco)}
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-sorbet-dark mb-2">Descrição</h3>
              <p className="text-gray-600">{product.descricao}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="pt-4">
              <h3 className="text-lg font-medium text-sorbet-dark mb-3">Quantidade</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-10 w-10 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="text-xl font-medium text-sorbet-dark w-8 text-center">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="pt-6">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark h-12 text-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              
              {!isAuthenticated && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Faça <Link to="/login" className="text-sorbet-orange hover:underline">login</Link> para adicionar ao carrinho
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-sorbet-dark mb-8">
              Você também pode gostar
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(produto => (
                <div key={produto.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <Link to={`/produto/${produto.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/produto/${produto.id}`}>
                      <h3 className="font-bold text-sorbet-dark hover:text-sorbet-orange transition-colors">
                        {produto.nome}
                      </h3>
                    </Link>
                    
                    <div className="mt-2">
                      {produto.promocao && produto.precoPromocional ? (
                        <div className="flex items-center space-x-2">
                          <span className="line-through text-gray-400 text-sm">
                            {formatPrice(produto.preco)}
                          </span>
                          <span className="font-bold text-sorbet-dark">
                            {formatPrice(produto.precoPromocional)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-sorbet-dark">
                          {formatPrice(produto.preco)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProdutoDetailPage;
