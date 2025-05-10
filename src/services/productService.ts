
import { 
  getProducts, 
  getProductById, 
  getProductsByType,
  saveProduct,
  deleteProduct,
  getPromotionalProducts
} from "../utils/localStorageDB";
import { ProductProps } from "@/components/ui/ProductCard";
import { toast } from "sonner";

// Product service with methods to manage products
export const ProductService = {
  // Get all products
  getAllProducts: (): ProductProps[] => {
    return getProducts();
  },
  
  // Get product by ID
  getProductById: (id: string): ProductProps | undefined => {
    return getProductById(id);
  },
  
  // Get products by type
  getProductsByType: (tipo: ProductProps["tipo"]): ProductProps[] => {
    return getProductsByType(tipo);
  },
  
  // Get products on promotion
  getPromotionalProducts: (): ProductProps[] => {
    return getPromotionalProducts();
  },
  
  // Create new product
  createProduct: (product: Omit<ProductProps, "id">): ProductProps => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    
    saveProduct(newProduct);
    toast.success("Produto criado com sucesso!");
    return newProduct;
  },
  
  // Update existing product
  updateProduct: (product: ProductProps): ProductProps => {
    saveProduct(product);
    toast.success("Produto atualizado com sucesso!");
    return product;
  },
  
  // Delete product
  deleteProduct: (id: string): void => {
    deleteProduct(id);
    toast.success("Produto excluído com sucesso!");
  }
};

export default ProductService;
