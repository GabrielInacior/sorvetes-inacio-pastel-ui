
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import { promocoes } from "@/data/produtos";

const PromocoesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader 
        title="Promoções" 
        subtitle="Aproveite nossas ofertas especiais e descontos exclusivos"
        imageBg="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Promotion Banner */}
        <div className="bg-gradient-to-r from-sorbet-peach to-sorbet-pink/30 rounded-xl p-8 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sorbet-dark">
            Ofertas Especiais do Mês
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Aproveite descontos exclusivos em nossos produtos selecionados durante este mês!
          </p>
        </div>
        
        {/* Promotions Grid */}
        {promocoes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {promocoes.map((promocao) => (
              <ProductCard key={promocao.id} produto={promocao} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600 mb-2">
              Não há promoções no momento.
            </h3>
            <p className="text-gray-500">
              Volte em breve para conferir nossas próximas ofertas especiais.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PromocoesPage;
