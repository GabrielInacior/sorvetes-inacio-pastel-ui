
import { ProductProps } from "@/components/ui/ProductCard";

// Sample product data for the interface
export const produtos: ProductProps[] = [
  {
    id: "1",
    nome: "Sorvete de Chocolate Belga",
    tipo: "massa",
    preco: 15.90,
    descricao: "Sorvete cremoso de chocolate belga premium, com pedaços de chocolate ao leite.",
    imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    nome: "Casquinha Mista",
    tipo: "casquinha",
    preco: 9.90,
    descricao: "Casquinha com duas bolas de sorvete à sua escolha. Opções de creme, chocolate ou morango.",
    imagem: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    nome: "Açaí Premium",
    tipo: "massa",
    preco: 18.90,
    descricao: "Açaí cremoso da Amazônia, batido na hora com banana e xarope de guaraná.",
    imagem: "https://images.unsplash.com/photo-1557142046-c704a3adf364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    promocao: true,
    precoPromocional: 16.90,
  },
  {
    id: "4",
    nome: "Sorvete por Quilo",
    tipo: "quilo",
    preco: 80.00,
    descricao: "Monte seu sorvete com mais de 20 sabores e 15 complementos à sua escolha.",
    imagem: "https://images.unsplash.com/photo-1629385901030-fa3ccfb0441d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    nome: "Sundae Tropical",
    tipo: "combinação",
    preco: 24.90,
    descricao: "Sorvete de creme com fatias de abacaxi caramelizado, calda de maracujá e chantilly.",
    imagem: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    promocao: true,
    precoPromocional: 19.90,
  },
  {
    id: "6",
    nome: "Milkshake de Morango",
    tipo: "combinação",
    preco: 16.90,
    descricao: "Milkshake cremoso de morango com chantilly e calda de frutas vermelhas.",
    imagem: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    nome: "Sorvete de Pistache",
    tipo: "massa",
    preco: 17.90,
    descricao: "Sorvete premium de pistache siciliano com pedaços de pistache torrado.",
    imagem: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    nome: "Casquinha de Baunilha",
    tipo: "casquinha",
    preco: 7.90,
    descricao: "Casquinha crocante com uma bola do nosso cremoso sorvete de baunilha.",
    imagem: "https://images.unsplash.com/photo-1557142046-c704a3adf364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export const promocoes = produtos.filter(produto => produto.promocao);

// Helper function to find a product by ID
export function getProdutoById(id: string) {
  return produtos.find(produto => produto.id === id);
}

// Helper function to get products by type
export function getProdutosByType(tipo: ProductProps["tipo"]) {
  return produtos.filter(produto => produto.tipo === tipo);
}
