
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, UserCog, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = (role: string) => (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginData.email || !loginData.senha) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock login logic
    console.log(`Login como ${role}:`, loginData);
    
    // Show success message
    toast({
      title: "Login realizado!",
      description: `Você foi autenticado com sucesso como ${role}.`,
    });
    
    // Redirect based on role
    if (role === "Administrador" || role === "Funcionário") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6 text-sorbet-dark">
                Acesso ao Sistema
              </h1>
              
              <Tabs defaultValue="cliente" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="cliente" className="flex flex-col items-center py-3">
                    <User className="h-6 w-6 mb-1" />
                    <span>Cliente</span>
                  </TabsTrigger>
                  <TabsTrigger value="funcionario" className="flex flex-col items-center py-3">
                    <UserCog className="h-6 w-6 mb-1" />
                    <span>Funcionário</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex flex-col items-center py-3">
                    <ShieldCheck className="h-6 w-6 mb-1" />
                    <span>Admin</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Cliente Login Form */}
                <TabsContent value="cliente">
                  <form onSubmit={handleLogin("Cliente")} className="space-y-6">
                    <div>
                      <label htmlFor="email-cliente" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email-cliente"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="senha-cliente" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha
                      </label>
                      <input
                        type="password"
                        id="senha-cliente"
                        name="senha"
                        value={loginData.senha}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="lembrar-cliente"
                          name="lembrar"
                          type="checkbox"
                          className="h-4 w-4 border-gray-300 rounded text-sorbet-orange focus:ring-sorbet-orange"
                        />
                        <label htmlFor="lembrar-cliente" className="ml-2 block text-sm text-gray-700">
                          Lembrar-me
                        </label>
                      </div>
                      
                      <a href="#" className="text-sm text-sorbet-orange hover:text-sorbet-orange/80">
                        Esqueceu a senha?
                      </a>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark py-6"
                    >
                      Entrar como Cliente
                    </Button>
                    
                    <p className="text-center text-sm text-gray-600">
                      Não tem uma conta?{" "}
                      <a href="#" className="text-sorbet-orange hover:text-sorbet-orange/80 font-medium">
                        Cadastre-se
                      </a>
                    </p>
                  </form>
                </TabsContent>
                
                {/* Funcionário Login Form */}
                <TabsContent value="funcionario">
                  <form onSubmit={handleLogin("Funcionário")} className="space-y-6">
                    <div>
                      <label htmlFor="email-funcionario" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Corporativo
                      </label>
                      <input
                        type="email"
                        id="email-funcionario"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="senha-funcionario" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha
                      </label>
                      <input
                        type="password"
                        id="senha-funcionario"
                        name="senha"
                        value={loginData.senha}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <a href="#" className="text-sm text-sorbet-orange hover:text-sorbet-orange/80">
                        Esqueceu a senha?
                      </a>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-sorbet-pink hover:bg-sorbet-pink/90 text-sorbet-dark py-6"
                    >
                      Entrar como Funcionário
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Admin Login Form */}
                <TabsContent value="admin">
                  <form onSubmit={handleLogin("Administrador")} className="space-y-6">
                    <div>
                      <label htmlFor="email-admin" className="block text-sm font-medium text-gray-700 mb-1">
                        Email do Administrador
                      </label>
                      <input
                        type="email"
                        id="email-admin"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="senha-admin" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha
                      </label>
                      <input
                        type="password"
                        id="senha-admin"
                        name="senha"
                        value={loginData.senha}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="lembrar-admin"
                          name="lembrar"
                          type="checkbox"
                          className="h-4 w-4 border-gray-300 rounded text-sorbet-orange focus:ring-sorbet-orange"
                        />
                        <label htmlFor="lembrar-admin" className="ml-2 block text-sm text-gray-700">
                          Lembrar-me
                        </label>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-sorbet-dark hover:bg-sorbet-dark/90 text-white py-6"
                    >
                      Entrar como Administrador
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/" className="text-sorbet-dark hover:text-sorbet-orange transition-colors">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
