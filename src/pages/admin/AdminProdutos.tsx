
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { produtos, ProductProps } from "@/data/produtos";

const AdminProdutos = () => {
  const { toast } = useToast();
  const [productsList, setProductsList] = useState<ProductProps[]>(produtos);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductProps | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  // Form state for new and editing products
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    tipo: "massa",
    preco: 0,
    descricao: "",
    imagem: "",
    promocao: false,
    precoPromocional: 0,
  });
  
  // Filter products based on search
  const filteredProducts = searchTerm 
    ? productsList.filter(p => 
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productsList;
  
  // Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      nome: "",
      tipo: "massa",
      preco: 0,
      descricao: "",
      imagem: "",
      promocao: false,
      precoPromocional: 0,
    });
    setEditingProduct(null);
  };
  
  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };
  
  // Handle select change
  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle switch change
  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  
  // Setup form for editing
  const setupEditForm = (product: ProductProps) => {
    setFormData({
      id: product.id,
      nome: product.nome,
      tipo: product.tipo,
      preco: product.preco,
      descricao: product.descricao,
      imagem: product.imagem,
      promocao: product.promocao || false,
      precoPromocional: product.precoPromocional || 0,
    });
    setEditingProduct(product);
  };
  
  // Handle save (create or update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.nome || !formData.preco || !formData.descricao || !formData.imagem) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.promocao && (!formData.precoPromocional || formData.precoPromocional >= formData.preco)) {
      toast({
        title: "Erro",
        description: "O preço promocional deve ser menor que o preço original.",
        variant: "destructive",
      });
      return;
    }
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = productsList.map(p => 
        p.id === formData.id ? { ...formData } : p
      );
      setProductsList(updatedProducts);
      toast({
        title: "Produto atualizado",
        description: `${formData.nome} foi atualizado com sucesso.`,
      });
    } else {
      // Create new product
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
      };
      setProductsList([...productsList, newProduct]);
      toast({
        title: "Produto criado",
        description: `${formData.nome} foi adicionado com sucesso.`,
      });
    }
    
    resetForm();
  };
  
  // Handle delete
  const handleDelete = () => {
    if (productToDelete) {
      const updatedProducts = productsList.filter(p => p.id !== productToDelete);
      setProductsList(updatedProducts);
      
      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso.",
      });
      
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };
  
  // Confirm delete
  const confirmDelete = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sorbet-dark">Gerenciar Produtos</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-sorbet-dark">
                {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSave} className="space-y-4">
              {/* Nome */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="nome">Nome*</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome do produto"
                    required
                  />
                </div>
              </div>
              
              {/* Tipo e Preço */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo*</Label>
                  <Select 
                    value={formData.tipo} 
                    onValueChange={(value) => handleSelectChange(value, "tipo")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="massa">Sorvete de Massa</SelectItem>
                      <SelectItem value="casquinha">Casquinha</SelectItem>
                      <SelectItem value="quilo">Por Quilo</SelectItem>
                      <SelectItem value="combinação">Combinação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preco">Preço (R$)*</Label>
                  <Input
                    id="preco"
                    name="preco"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.preco}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              {/* Descrição */}
              <div>
                <Label htmlFor="descricao">Descrição*</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descrição do produto"
                  rows={3}
                  required
                />
              </div>
              
              {/* Imagem */}
              <div>
                <Label htmlFor="imagem">URL da Imagem*</Label>
                <Input
                  id="imagem"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>
              
              {/* Promoção */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promocao">Em Promoção</Label>
                  <p className="text-sm text-gray-500">
                    Marque se o produto estiver em promoção
                  </p>
                </div>
                <Switch
                  id="promocao"
                  checked={formData.promocao}
                  onCheckedChange={(checked) => handleSwitchChange(checked, "promocao")}
                />
              </div>
              
              {/* Preço Promocional (visible only when promocao is true) */}
              {formData.promocao && (
                <div>
                  <Label htmlFor="precoPromocional">Preço Promocional (R$)*</Label>
                  <Input
                    id="precoPromocional"
                    name="precoPromocional"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precoPromocional}
                    onChange={handleChange}
                    required
                  />
                  {formData.precoPromocional >= formData.preco && (
                    <p className="text-sm text-red-500 mt-1">
                      O preço promocional deve ser menor que o preço original.
                    </p>
                  )}
                </div>
              )}
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-sorbet-orange hover:bg-sorbet-orange/90 text-sorbet-dark">
                  {editingProduct ? "Atualizar" : "Adicionar"} Produto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Products Management */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Type filters */}
            <Tabs defaultValue="all" className="w-full max-w-md">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="massa">Massa</TabsTrigger>
                <TabsTrigger value="casquinha">Casquinha</TabsTrigger>
                <TabsTrigger value="quilo">Por Quilo</TabsTrigger>
                <TabsTrigger value="combinação">Combinação</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((produto) => (
                    <tr key={produto.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={produto.imagem} alt={produto.nome} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{produto.descricao}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {produto.tipo === 'massa' && 'Sorvete de Massa'}
                        {produto.tipo === 'casquinha' && 'Casquinha'}
                        {produto.tipo === 'quilo' && 'Por Quilo'}
                        {produto.tipo === 'combinação' && 'Combinação'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {produto.promocao && produto.precoPromocional ? (
                          <div>
                            <span className="line-through text-gray-400">R$ {produto.preco.toFixed(2)}</span>
                            <span className="ml-2">R$ {produto.precoPromocional.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span>R$ {produto.preco.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${produto.promocao ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {produto.promocao ? 'Promoção' : 'Ativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => setupEditForm(produto)} 
                              variant="ghost" 
                              size="icon"
                              className="text-yellow-500 hover:text-yellow-700 hover:bg-yellow-50"
                            >
                              <Edit size={18} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            {/* Same form as above */}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          onClick={() => confirmDelete(produto.id)} 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      {searchTerm ? (
                        <p>Nenhum produto encontrado para "{searchTerm}".</p>
                      ) : (
                        <p>Ainda não há produtos cadastrados.</p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700">
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </p>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProdutos;
