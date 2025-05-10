import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, LogOut, User, Shield, UserCog, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { getCartItemsCount } from "@/utils/localStorageDB";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoSorveteria from "@/assets/LogoSorveteria.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Update cart items count when component mounts and periodically
  useEffect(() => {
    const updateCartCount = () => {
      setCartItemsCount(getCartItemsCount());
    };

    // Update immediately
    updateCartCount();

    // Update every second to keep count in sync
    const interval = setInterval(updateCartCount, 1000);

    return () => clearInterval(interval);
  }, []);

  const getUserInitials = () => {
    if (!currentUser?.nome) return "U";
    return currentUser.nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserTypeIcon = () => {
    switch (currentUser?.tipo) {
      case "administrador":
        return <Shield className="h-4 w-4 text-purple-500" />;
      case "funcionario":
        return <UserCog className="h-4 w-4 text-blue-500" />;
      default:
        return <UserCheck className="h-4 w-4 text-green-500" />;
    }
  };

  const getUserTypeLabel = () => {
    switch (currentUser?.tipo) {
      case "administrador":
        return "Administrador";
      case "funcionario":
        return "Funcionário";
      default:
        return "Cliente";
    }
  };

  return (
    <nav className="bg-sorbet-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={LogoSorveteria} alt="Sorvetes Inacio" className="w-10 h-10 object-contain" />
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
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sorbet-pink text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-sorbet-orange flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{getUserInitials()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser?.nome}</p>
                      <div className="flex items-center gap-2">
                        {getUserTypeIcon()}
                        <p className="text-xs leading-none text-muted-foreground">
                          {getUserTypeLabel()}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentUser?.tipo === "administrador" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Painel Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-sorbet-orange text-sorbet-dark hover:bg-sorbet-orange/90">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/carrinho" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6 text-sorbet-dark" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sorbet-pink text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-sorbet-orange flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{getUserInitials()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser?.nome}</p>
                      <div className="flex items-center gap-2">
                        {getUserTypeIcon()}
                        <p className="text-xs leading-none text-muted-foreground">
                          {getUserTypeLabel()}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentUser?.tipo === "administrador" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Painel Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6 text-sorbet-dark" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !isAuthenticated && (
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
