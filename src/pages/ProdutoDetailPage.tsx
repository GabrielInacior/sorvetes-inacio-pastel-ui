
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getProdutoById } from "@/data/produtos";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const ProdutoDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const produto = id ? getProdutoById(id) : null;
  const [quantidade, setQuantidade] = useState(1);
  
  const incrementarQuantidade = () => {
    setQuantidade((prev) => prev + 1);
  };
  
  const decrementarQuantidade = () => {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  // Handle when product is not found
  if (!produto) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-sorbet-dark">Produto não encontrado</h1>
            <Link to="/cardapio">
              <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Cardápio
              </Button>
            </Link>
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
        {/* Back Button */}
        <Link to="/cardapio" className="inline-flex items-center text-sorbet-orange hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Cardápio
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-sorbet-peach px-3 py-1 rounded-full text-sm text-sorbet-dark mb-2">
                {produto.tipo === 'massa' && 'Sorvete de Massa'}
                {produto.tipo === 'casquinha' && 'Casquinha'}
                {produto.tipo === 'quilo' && 'Por Quilo'}
                {produto.tipo === 'combinação' && 'Combinação'}
              </span>
              <h1 className="text-3xl font-bold text-sorbet-dark">{produto.nome}</h1>
            </div>

            <div className="mb-6">
              {produto.promocao && produto.precoPromocional ? (
                <div className="flex items-center mb-2">
                  <span className="text-gray-400 line-through text-xl mr-3">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                  <span className="text-sorbet-dark font-bold text-3xl">
                    R$ {produto.precoPromocional.toFixed(2)}
                    {produto.tipo === "quilo" && <span className="text-sm font-normal">/kg</span>}
                  </span>
                </div>
              ) : (
                <div className="mb-2">
                  <span className="text-sorbet-dark font-bold text-3xl">
                    R$ {produto.preco.toFixed(2)}
                    {produto.tipo === "quilo" && <span className="text-sm font-normal">/kg</span>}
                  </span>
                </div>
              )}
              
              {produto.promocao && (
                <span className="inline-block bg-sorbet-pink text-sorbet-dark font-medium px-3 py-1 rounded-full text-sm">
                  Promoção
                </span>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="font-semibold text-lg mb-2 text-sorbet-dark">Descrição</h2>
              <p className="text-gray-600">
                {produto.descricao}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-8">
              <h2 className="font-semibold text-lg mb-3 text-sorbet-dark">Quantidade</h2>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={decrementarQuantidade}
                  className="rounded-full border-sorbet-orange text-sorbet-dark h-10 w-10"
                >
                  -
                </Button>
                <span className="text-xl font-medium w-10 text-center">
                  {quantidade}
                </span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={incrementarQuantidade}
                  className="rounded-full border-sorbet-orange text-sorbet-dark h-10 w-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark flex-1 py-6">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Link to="/carrinho" className="flex-1">
                <Button variant="outline" className="border-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/10 w-full py-6">
                  Comprar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProdutoDetailPage;
