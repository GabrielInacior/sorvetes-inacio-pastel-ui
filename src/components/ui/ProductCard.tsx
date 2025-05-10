
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export interface ProductProps {
  id: string;
  nome: string;
  tipo: 'massa' | 'casquinha' | 'quilo' | 'combinação';
  preco: number;
  descricao: string;
  imagem: string;
  promocao?: boolean;
  precoPromocional?: number;
}

const ProductCard = ({ produto }: { produto: ProductProps }) => {
  return (
    <div className="product-card bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover"
        />
        {produto.promocao && (
          <div className="absolute top-3 right-3 bg-sorbet-pink text-sorbet-dark font-semibold px-3 py-1 rounded-full text-sm">
            Promoção
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-sorbet-dark">{produto.nome}</h3>
          <div className="flex items-center">
            {produto.promocao && produto.precoPromocional ? (
              <>
                <span className="text-gray-400 line-through text-sm mr-2">
                  R$ {produto.preco.toFixed(2)}
                </span>
                <span className="font-bold text-lg text-sorbet-dark">
                  R$ {produto.precoPromocional.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-sorbet-dark">
                R$ {produto.preco.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        <span className="inline-block bg-sorbet-peach px-2 py-1 rounded-full text-xs text-sorbet-dark mb-2">
          {produto.tipo === 'massa' && 'Sorvete de Massa'}
          {produto.tipo === 'casquinha' && 'Casquinha'}
          {produto.tipo === 'quilo' && 'Por Quilo'}
          {produto.tipo === 'combinação' && 'Combinação'}
        </span>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {produto.descricao}
        </p>

        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            asChild 
            className="text-sorbet-orange hover:text-sorbet-orange/80 hover:bg-transparent p-0"
          >
            <Link to={`/produto/${produto.id}`}>Ver Detalhes</Link>
          </Button>

          <Button 
            size="icon" 
            className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-white rounded-full h-9 w-9"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
