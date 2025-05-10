
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  LayoutDashboard, 
  Menu, 
  ShoppingCart, 
  User, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      name: 'Produtos', 
      path: '/admin/produtos', 
      icon: <ShoppingCart size={20} /> 
    },
    { 
      name: 'Usuários', 
      path: '/admin/usuarios', 
      icon: <User size={20} /> 
    },
  ];

  return (
    <div className={cn(
      "bg-white shadow-md h-screen transition-all duration-300 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header with logo */}
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-sorbet-orange flex items-center justify-center">
              <span className="text-white font-bold text-xs">SI</span>
            </div>
            <span className="text-lg font-bold text-sorbet-dark">Admin Panel</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/admin" className="mx-auto">
            <div className="w-10 h-10 rounded-full bg-sorbet-orange flex items-center justify-center">
              <span className="text-white font-bold text-xs">SI</span>
            </div>
          </Link>
        )}
        
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(true)}
            className="hover:bg-sorbet-peach/20"
          >
            <ChevronRight size={18} />
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center rounded-lg py-3 px-4 transition-colors",
                  isActive(item.path) 
                    ? "bg-sorbet-orange/10 text-sorbet-dark font-medium" 
                    : "text-gray-600 hover:bg-sorbet-peach/10"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with toggle and logout */}
      <div className="p-4 border-t">
        {collapsed ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(false)}
            className="w-full flex justify-center hover:bg-sorbet-peach/20"
          >
            <Menu size={20} />
          </Button>
        ) : (
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-sorbet-dark hover:bg-sorbet-peach/10">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao site
            </Button>
          </Link>
        )}
        
        <Link to="/login">
          <Button 
            variant="ghost" 
            className={cn(
              "mt-4 text-gray-600 hover:text-red-500 hover:bg-red-50",
              collapsed ? "w-full justify-center" : "w-full justify-start"
            )}
          >
            <LogOut className={cn("h-5 w-5", !collapsed && "mr-2")} />
            {!collapsed && "Sair"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
