
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { MessageService } from "@/services/messageService";

const ContatoPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send message using our service
      MessageService.sendMessage(nome, email, mensagem);
      
      // Reset form
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <PageHeader
        title="Contato"
        subtitle="Entre em contato conosco, estamos ansiosos para atendê-lo"
      />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-sorbet-dark">Envie uma mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                
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
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Como podemos ajudar?"
                    rows={5}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-sorbet-dark">Informações de Contato</h2>
            
            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-sorbet-peach/20 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-sorbet-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-sorbet-dark">Telefone</h3>
                    <p className="text-gray-600">(11) 5555-1234</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-sorbet-peach/20 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-sorbet-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-sorbet-dark">Email</h3>
                    <p className="text-gray-600">contato@sorveteinacio.com.br</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-sorbet-peach/20 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-sorbet-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-sorbet-dark">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Paulista, 1578 - Bela Vista<br />
                      São Paulo - SP, 01310-200
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-6">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Mapa interativo seria exibido aqui</p>
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
