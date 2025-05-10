import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard, { ProductProps } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import LogoSorveteria from "@/assets/LogoSorveteria.png";
import { produtos, promocoes } from "@/data/produtos";

const HomePage = () => {
  // Get some featured products
  const featuredProducts = produtos.slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url(https://images.unsplash.com/photo-1627373719412-746f5c1e5363?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", 
            filter: "brightness(0.6)" 
          }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Os Melhores Sorvetes do Brasil
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Sabores autênticos, tradição e qualidade desde 1995. Experimente o verdadeiro sabor da felicidade!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/cardapio">
                <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark text-lg px-8 py-6">
                  Ver Cardápio
                </Button>
              </Link>
              <Link to="/promocoes">
                <Button variant="outline" className="border-white text-sorbet-dark hover:bg-white/20 text-lg px-8 py-6">
                  Promoções
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg 
            className="absolute bottom-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path 
              className="fill-sorbet-pink"
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-sorbet-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-sorbet-dark">
            Nossos Produtos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Massas */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sorvetes de Massa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-sorbet-dark">Sorvetes de Massa</h3>
                <p className="text-gray-600 mb-4">
                  Os mais cremosos e saborosos sorvetes, feitos com ingredientes frescos e naturais.
                </p>
                <Link to="/cardapio?tipo=massa">
                  <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
                    Ver Opções
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Casquinhas */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Casquinhas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-sorbet-dark">Casquinhas</h3>
                <p className="text-gray-600 mb-4">
                  Casquinhas crocantes com os nossos sabores especiais de sorvete.
                </p>
                <Link to="/cardapio?tipo=casquinha">
                  <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
                    Ver Opções
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Quilo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1590080962330-747c6aba8028?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Por Quilo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-sorbet-dark">Por Quilo</h3>
                <p className="text-gray-600 mb-4">
                  Monte seu sorvete como preferir com mais de 20 sabores e diversos complementos.
                </p>
                <Link to="/cardapio?tipo=quilo">
                  <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
                    Ver Opções
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Combinações */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Combinações" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-sorbet-dark">Combinações</h3>
                <p className="text-gray-600 mb-4">
                  Sundaes, milkshakes e outras deliciosas combinações para você saborear.
                </p>
                <Link to="/cardapio?tipo=combinação">
                  <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
                    Ver Opções
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-sorbet-dark">
              Produtos Destaques
            </h2>
            <Link to="/cardapio">
              <Button variant="link" className="text-sorbet-orange hover:text-sorbet-orange/80">
                Ver Todos os Produtos →
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} produto={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotions Preview */}
      {promocoes.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-sorbet-peach to-sorbet-pink/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-sorbet-dark">
              Promoções Especiais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promocoes.slice(0, 3).map(promocao => (
                <ProductCard key={promocao.id} produto={promocao} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/promocoes">
                <Button className="bg-sorbet-pink hover:bg-sorbet-pink/90 text-sorbet-dark">
                  Ver Todas as Promoções
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* About Us Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/4">
              <img 
                src={LogoSorveteria} 
                alt="Sobre Sorvetes Inacio" 
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-sorbet-dark">
                Sobre a Sorvetes Inacio
              </h2>
              <p className="text-gray-600 mb-6">
                Desde 1995, a Sorvetes Inacio tem o compromisso de oferecer os melhores sorvetes artesanais do Brasil. Nossa história começou como uma pequena sorveteria familiar e hoje somos referência em qualidade e sabor.
              </p>
              <p className="text-gray-600 mb-8">
                Trabalhamos com ingredientes selecionados, receitas tradicionais e um processo de produção que preserva o verdadeiro sabor do sorvete artesanal.
              </p>
              <Link to="/sobre">
                <Button className="border-2 border-sorbet-orange bg-transparent hover:bg-sorbet-orange/10 text-sorbet-dark">
                  Conheça Nossa História
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
