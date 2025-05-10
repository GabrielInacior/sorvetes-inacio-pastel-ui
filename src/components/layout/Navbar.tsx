
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-sorbet-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-sorbet-orange flex items-center justify-center">
              <span className="text-white font-bold text-xl">SI</span>
            </div>
            <span className="text-2xl font-bold text-sorbet-dark">Sorvetes Inacio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sorbet-dark hover:text-sorbet-orange font-medium transition-colors">
              Início
            </Link>
            <Link to="/cardapio" className="text-sorbet-dark hover:text-sorbet-orange font-medium transition-colors">
              Cardápio
            </Link>
            <Link to="/promocoes" className="text-sorbet-dark hover:text-sorbet-orange font-medium transition-colors">
              Promoções
            </Link>
            <Link to="/sobre" className="text-sorbet-dark hover:text-sorbet-orange font-medium transition-colors">
              Sobre Nós
            </Link>
            <Link to="/contato" className="text-sorbet-dark hover:text-sorbet-orange font-medium transition-colors">
              Contato
            </Link>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6 text-sorbet-dark" />
                <span className="absolute -top-1 -right-1 bg-sorbet-pink text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90">
                Entrar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/carrinho" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6 text-sorbet-dark" />
                <span className="absolute -top-1 -right-1 bg-sorbet-pink text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-sorbet-dark" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-4">
            <Link 
              to="/"
              className="block px-4 py-2 text-sorbet-dark hover:bg-sorbet-orange/10 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/cardapio"
              className="block px-4 py-2 text-sorbet-dark hover:bg-sorbet-orange/10 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link 
              to="/promocoes"
              className="block px-4 py-2 text-sorbet-dark hover:bg-sorbet-orange/10 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Promoções
            </Link>
            <Link 
              to="/sobre"
              className="block px-4 py-2 text-sorbet-dark hover:bg-sorbet-orange/10 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contato"
              className="block px-4 py-2 text-sorbet-dark hover:bg-sorbet-orange/10 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link 
              to="/login"
              className="block px-4 py-2 text-white bg-sorbet-orange rounded-lg text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
