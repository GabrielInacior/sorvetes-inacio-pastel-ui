
import { 
  getMessages,
  saveMessage,
  markMessageAsRead,
  deleteMessage,
  Message
} from "../utils/localStorageDB";
import { toast } from "sonner";

// Message service with methods to manage contact messages
export const MessageService = {
  // Get all messages
  getAllMessages: (): Message[] => {
    return getMessages();
  },
  
  // Get unread messages
  getUnreadMessages: (): Message[] => {
    return getMessages().filter(message => !message.lido);
  },
  
  // Send a new message
  sendMessage: (nome: string, email: string, mensagem: string): Message => {
    const newMessage: Message = {
      id: Date.now().toString(),
      nome,
      email,
      mensagem,
      dataEnvio: new Date().toISOString(),
      lido: false
    };
    
    saveMessage(newMessage);
    toast.success("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    return newMessage;
  },
  
  // Mark message as read
  markAsRead: (id: string): void => {
    markMessageAsRead(id);
  },
  
  // Delete message
  deleteMessage: (id: string): void => {
    deleteMessage(id);
    toast.success("Mensagem excluída.");
  }
};

export default MessageService;
