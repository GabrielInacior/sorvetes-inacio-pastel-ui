
import {
  getPromotions,
  getActivePromotions,
  savePromotion,
  deletePromotion,
  Promotion
} from "../utils/localStorageDB";
import { toast } from "sonner";

// Promotion service with methods to manage promotions
export const PromotionService = {
  // Get all promotions
  getAllPromotions: (): Promotion[] => {
    return getPromotions();
  },
  
  // Get only active promotions (current date is between start and end dates)
  getActivePromotions: (): Promotion[] => {
    return getActivePromotions();
  },
  
  // Create new promotion
  createPromotion: (promotion: Omit<Promotion, "id">): Promotion => {
    const newPromotion = {
      ...promotion,
      id: Date.now().toString()
    };
    
    savePromotion(newPromotion);
    toast.success("Promoção criada com sucesso!");
    return newPromotion;
  },
  
  // Update existing promotion
  updatePromotion: (promotion: Promotion): Promotion => {
    savePromotion(promotion);
    toast.success("Promoção atualizada com sucesso!");
    return promotion;
  },
  
  // Delete promotion
  deletePromotion: (id: string): void => {
    deletePromotion(id);
    toast.success("Promoção excluída com sucesso!");
  },
  
  // Check if a promotion is active
  isPromotionActive: (promotion: Promotion): boolean => {
    const now = new Date();
    const startDate = new Date(promotion.dataInicio);
    const endDate = new Date(promotion.dataFim);
    
    return startDate <= now && now <= endDate;
  },
  
  // Format discount value for display
  formatDiscount: (promotion: Promotion): string => {
    if (promotion.tipoDesconto === "percentual") {
      return `${promotion.valorDesconto}%`;
    } else {
      return `R$ ${promotion.valorDesconto.toFixed(2)}`;
    }
  }
};

export default PromotionService;
