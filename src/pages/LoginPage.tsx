
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, UsersRound } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { saveUser, User as UserType, UserType as UserRole } from "@/utils/localStorageDB";

const LoginPage = () => {
  const { login, currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [userType, setUserType] = useState<UserRole>("cliente");
  
  // Registration form state
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    
    const success = await login(email, senha);
    if (success) {
      // Redirect based on user type
      if (userType === "administrador" || userType === "funcionario") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };
  
  // Handle registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast.error("As senhas não conferem.");
      return;
    }
    
    // Create new user
    const newUser: UserType = {
      id: Date.now().toString(),
      nome: registerName,
      email: registerEmail,
      senha: registerPassword,
      tipo: "cliente", // New users are always clients
      dataCriacao: new Date().toISOString(),
    };
    
    // Save user
    saveUser(newUser);
    
    toast.success("Cadastro realizado com sucesso! Faça login para continuar.");
    // Reset form and switch to login
    setIsRegistering(false);
    setEmail(registerEmail);
    setSenha(registerPassword);
  };
  
  // If already logged in, redirect
  if (isAuthenticated) {
    const redirectPath = currentUser?.tipo === "cliente" ? "/" : "/admin";
    navigate(redirectPath, { replace: true });
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-sorbet-peach/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-sorbet-dark">
                {isRegistering ? "Criar Conta" : "Acesso ao Sistema"}
              </CardTitle>
              <CardDescription>
                {isRegistering
                  ? "Preencha os dados para criar sua conta"
                  : "Faça login para acessar sua conta"}
              </CardDescription>
            </CardHeader>
            
            {!isRegistering ? (
              // Login form
              <>
                <Tabs defaultValue="cliente" className="w-full" onValueChange={(value) => setUserType(value as UserRole)}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="cliente" className="flex items-center gap-2">
                      <User size={16} />
                      Cliente
                    </TabsTrigger>
                    <TabsTrigger value="funcionario" className="flex items-center gap-2">
                      <ShoppingBag size={16} />
                      Funcionário
                    </TabsTrigger>
                    <TabsTrigger value="administrador" className="flex items-center gap-2">
                      <UsersRound size={16} />
                      Admin
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cliente">
                    <CardContent className="pt-6">
                      <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                              id="password"
                              type="password"
                              value={senha}
                              onChange={(e) => setSenha(e.target.value)}
                              required
                            />
                          </div>
                          
                          <Button type="submit" className="w-full bg-sorbet-orange hover:bg-sorbet-orange/90">
                            Entrar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="funcionario">
                    <CardContent className="pt-6">
                      <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="employee-email">Email</Label>
                            <Input
                              id="employee-email"
                              type="email"
                              placeholder="funcionario@sorveteinacio.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="employee-password">Senha</Label>
                            <Input
                              id="employee-password"
                              type="password"
                              value={senha}
                              onChange={(e) => setSenha(e.target.value)}
                              required
                            />
                          </div>
                          
                          <Button type="submit" className="w-full bg-sorbet-orange hover:bg-sorbet-orange/90">
                            Entrar como Funcionário
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="administrador">
                    <CardContent className="pt-6">
                      <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="admin-email">Email</Label>
                            <Input
                              id="admin-email"
                              type="email"
                              placeholder="admin@sorveteinacio.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="admin-password">Senha</Label>
                            <Input
                              id="admin-password"
                              type="password"
                              value={senha}
                              onChange={(e) => setSenha(e.target.value)}
                              required
                            />
                          </div>
                          
                          <Button type="submit" className="w-full bg-sorbet-orange hover:bg-sorbet-orange/90">
                            Entrar como Administrador
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                </Tabs>
                
                <CardFooter className="flex flex-col">
                  <div className="text-center w-full">
                    <Button 
                      variant="link" 
                      className="text-sorbet-dark hover:text-sorbet-orange" 
                      onClick={() => setIsRegistering(true)}
                    >
                      Ainda não tem uma conta? Cadastre-se
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              // Registration form
              <CardContent className="pt-6">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nome Completo</Label>
                      <Input
                        id="register-name"
                        placeholder="Seu nome completo"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="pt-2 flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsRegistering(false)}
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-sorbet-orange hover:bg-sorbet-orange/90"
                      >
                        Cadastrar
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
