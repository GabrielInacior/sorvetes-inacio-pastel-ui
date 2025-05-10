
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContatoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.nome || !formData.email || !formData.mensagem) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally send the data to a server
    console.log("Formulário enviado:", formData);
    
    // Show success message
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado por entrar em contato. Responderemos em breve.",
    });
    
    // Reset form
    setFormData({
      nome: "",
      email: "",
      mensagem: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader 
        title="Contato" 
        subtitle="Entre em contato conosco. Estamos ansiosos para ouvir você!"
      />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-sorbet-dark">Envie uma Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sorbet-orange focus:border-sorbet-orange"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-sorbet-dark">Informações de Contato</h2>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-sorbet-dark">Loja Principal</h3>
                
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sorbet-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      Av. Atlântica, 1702<br />
                      Copacabana, Rio de Janeiro - RJ<br />
                      CEP: 22021-001
                    </span>
                  </p>
                  
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sorbet-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(21) 2222-2222</span>
                  </p>
                  
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sorbet-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contato@sorvetesinacio.com.br</span>
                  </p>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sorbet-dark">Horário de Funcionamento:</h4>
                    <p>Segunda a Domingo: 12h às 22h</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.118337275885!2d-43.18864248503361!3d-22.97859798497237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd54579a5956b%3A0xa102deeaffcb8e3!2sAv.%20Atl%C3%A2ntica%2C%201702%20-%20Copacabana%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022021-001!5e0!3m2!1spt-BR!2sbr!4v1651653234512!5m2!1spt-BR!2sbr" 
                  className="w-full h-96" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  title="Localização da Sorvetes Inacio"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContatoPage;
