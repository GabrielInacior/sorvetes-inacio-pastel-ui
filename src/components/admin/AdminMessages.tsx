
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageService } from "@/services/messageService";
import { Message } from "@/utils/localStorageDB";
import { Check, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<string>("unread");
  
  // Load messages
  const loadMessages = () => {
    const allMessages = MessageService.getAllMessages();
    setMessages(allMessages);
  };
  
  // Initial load
  useEffect(() => {
    loadMessages();
  }, []);
  
  // Handle mark as read
  const handleMarkAsRead = (id: string) => {
    MessageService.markAsRead(id);
    loadMessages();
  };
  
  // Handle delete message
  const handleDeleteMessage = (id: string) => {
    MessageService.deleteMessage(id);
    loadMessages();
  };
  
  // Filter messages based on active tab
  const filteredMessages = activeTab === "unread" 
    ? messages.filter(msg => !msg.lido)
    : messages;
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPpp", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Mensagens dos Clientes</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs 
          defaultValue="unread" 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="unread">
              Não Lidas ({messages.filter(msg => !msg.lido).length})
            </TabsTrigger>
            <TabsTrigger value="all">
              Todas ({messages.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="unread" className="space-y-4">
            {filteredMessages.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                Não há mensagens não lidas.
              </p>
            ) : (
              filteredMessages.map(message => (
                <div 
                  key={message.id} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sorbet-dark">{message.nome}</h3>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleMarkAsRead(message.id)}
                        className="h-8 w-8 text-green-500 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteMessage(message.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{message.email}</p>
                  <p className="text-sm text-gray-600 mb-3">{message.mensagem}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(message.dataEnvio)}
                  </p>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            {filteredMessages.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                Não há mensagens.
              </p>
            ) : (
              filteredMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${message.lido ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sorbet-dark">{message.nome}</h3>
                    <div className="flex space-x-2">
                      {!message.lido && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleMarkAsRead(message.id)}
                          className="h-8 w-8 text-green-500 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteMessage(message.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{message.email}</p>
                  <p className="text-sm text-gray-600 mb-3">{message.mensagem}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(message.dataEnvio)}
                    {message.lido && ' · Lida'}
                  </p>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminMessages;
