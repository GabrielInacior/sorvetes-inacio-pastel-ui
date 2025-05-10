
import { ProductProps } from "@/components/ui/ProductCard";

// Sample product data for the interface
export const produtos: ProductProps[] = [
  {
    id: "1",
    nome: "Sorvete de Chocolate Belga",
    tipo: "massa",
    preco: 15.90,
    descricao: "Sorvete cremoso de chocolate belga premium, com pedaços de chocolate ao leite.",
    imagem: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    nome: "Casquinha Mista",
    tipo: "casquinha",
    preco: 9.90,
    descricao: "Casquinha com duas bolas de sorvete à sua escolha. Opções de creme, chocolate ou morango.",
    imagem: "https://images.unsplash.com/photo-1592413890637-ea80fb4ed093?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    nome: "Açaí Premium",
    tipo: "massa",
    preco: 18.90,
    descricao: "Açaí cremoso da Amazônia, batido na hora com banana e xarope de guaraná.",
    imagem: "https://images.unsplash.com/photo-1684403620650-81dc661a69db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    promocao: true,
    precoPromocional: 16.90,
  },
  {
    id: "4",
    nome: "Sorvete por Quilo",
    tipo: "quilo",
    preco: 80.00,
    descricao: "Monte seu sorvete com mais de 20 sabores e 15 complementos à sua escolha.",
    imagem: "https://images.unsplash.com/photo-1560801619-01d71da0f70c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    nome: "Sundae Tropical",
    tipo: "combinação",
    preco: 24.90,
    descricao: "Sorvete de creme com fatias de abacaxi caramelizado, calda de maracujá e chantilly.",
    imagem: "https://plus.unsplash.com/premium_photo-1669680785558-c189b49aed4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    promocao: true,
    precoPromocional: 19.90,
  },
  {
    id: "6",
    nome: "Milkshake de Morango",
    tipo: "combinação",
    preco: 16.90,
    descricao: "Milkshake cremoso de morango com chantilly e calda de frutas vermelhas.",
    imagem: "https://plus.unsplash.com/premium_photo-1695927469061-4c307d53c7a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "7",
    nome: "Sorvete de Pistache",
    tipo: "massa",
    preco: 17.90,
    descricao: "Sorvete premium de pistache siciliano com pedaços de pistache torrado.",
    imagem: "https://images.unsplash.com/photo-1603736029103-dafad0eb0906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGlzdGFjaGlvJTIwaWNlJTIwY3JlYW18ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "8",
    nome: "Casquinha de Baunilha",
    tipo: "casquinha",
    preco: 7.90,
    descricao: "Casquinha crocante com uma bola do nosso cremoso sorvete de baunilha.",
    imagem: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmFuaWxsYSUyMGljZSUyMGNyZWFtfGVufDB8fDB8fHww",
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
