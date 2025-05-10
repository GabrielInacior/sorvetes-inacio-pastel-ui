import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import { ProductProps } from "@/components/ui/ProductCard";
import { ProductService } from "@/services/productService";
import { PromotionService } from "@/services/promotionService";

const PromocoesPage = () => {
  const [promotionalProducts, setPromotionalProducts] = useState<ProductProps[]>([]);
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load promotional products and active promotions
        const products = ProductService.getPromotionalProducts();
        const activePromos = PromotionService.getActivePromotions();
        
        setPromotionalProducts(products);
        setPromotions(activePromos);
      } catch (error) {
        console.error("Erro ao carregar promoções:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader 
        title="Promoções" 
        subtitle="Aproveite nossas ofertas especiais e descontos exclusivos"
        imageBg="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Active Promotions Banner */}
        {promotions.length > 0 && (
          <div className="mb-12 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-sorbet-dark text-center">
              Ofertas Especiais do Mês
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map(promo => (
                <div 
                  key={promo.id} 
                  className="bg-gradient-to-r from-sorbet-peach to-sorbet-pink/30 rounded-xl p-6 text-center"
                >
                  <h3 className="text-xl font-bold mb-2 text-sorbet-dark">{promo.titulo}</h3>
                  <p className="text-gray-700 mb-4">{promo.descricao}</p>
                  <div className="inline-block bg-white px-4 py-2 rounded-full font-medium text-sorbet-dark">
                    {PromotionService.formatDiscount(promo)} OFF
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Promotional Products */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-sorbet-dark text-center mb-8">
            Produtos em Promoção
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sorbet-orange mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando promoções...</p>
            </div>
          ) : promotionalProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {promotionalProducts.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-sorbet-peach/10 rounded-xl">
              <h3 className="text-xl text-gray-600 mb-2">
                Não há produtos em promoção no momento.
              </h3>
              <p className="text-gray-500">
                Volte em breve para conferir nossas próximas ofertas especiais.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromocoesPage;
