import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard, { ProductProps } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/services/productService";

const CardapioPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [isLoading, setIsLoading] = useState(true);
  
  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);
  
  // Filter products based on URL parameter
  useEffect(() => {
    const tipoParam = searchParams.get("tipo");
    if (tipoParam) {
      filterProducts(tipoParam);
      setActiveFilter(tipoParam);
    } else {
      filterProducts("todos");
    }
  }, [searchParams]);
  
  // Load all products
  const loadProducts = () => {
    try {
      const products = ProductService.getAllProducts();
      setFilteredProducts(products);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter products by type
  const filterProducts = (tipo: string) => {
    if (tipo === "todos") {
      loadProducts();
    } else {
      const filtered = ProductService.getProductsByType(tipo as ProductProps["tipo"]);
      setFilteredProducts(filtered);
    }
    setActiveFilter(tipo);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader 
        title="Cardápio" 
        subtitle="Conheça nossa variedade de sorvetes e sobremesas deliciosas"
        imageBg="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={activeFilter === "todos" ? "default" : "outline"}
            className={`rounded-full ${activeFilter === "todos" ? "bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90" : "border-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/10"}`}
            onClick={() => filterProducts("todos")}
          >
            Todos os Produtos
          </Button>
          <Button
            variant={activeFilter === "massa" ? "default" : "outline"}
            className={`rounded-full ${activeFilter === "massa" ? "bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90" : "border-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/10"}`}
            onClick={() => filterProducts("massa")}
          >
            Sorvetes de Massa
          </Button>
          <Button
            variant={activeFilter === "casquinha" ? "default" : "outline"}
            className={`rounded-full ${activeFilter === "casquinha" ? "bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90" : "border-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/10"}`}
            onClick={() => filterProducts("casquinha")}
          >
            Casquinhas
          </Button>
          <Button
            variant={activeFilter === "quilo" ? "default" : "outline"}
            className={`rounded-full ${activeFilter === "quilo" ? "bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90" : "border-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/10"}`}
            onClick={() => filterProducts("quilo")}
          >
            Por Quilo
          </Button>
          <Button
            variant={activeFilter === "combinação" ? "default" : "outline"}
            className={`rounded-full ${activeFilter === "combinação" ? "bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90" : "border-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/10"}`}
            onClick={() => filterProducts("combinação")}
          >
            Combinações
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sorbet-orange mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando produtos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl text-gray-600">
                Nenhum produto encontrado nesta categoria.
              </h3>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CardapioPage;
