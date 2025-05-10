
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { produtos } from "@/data/produtos";

// Mock data for charts
const salesData = [
  { name: "Jan", vendas: 4000 },
  { name: "Fev", vendas: 3000 },
  { name: "Mar", vendas: 5000 },
  { name: "Abr", vendas: 8000 },
  { name: "Mai", vendas: 7000 },
  { name: "Jun", vendas: 9000 },
];

const topProductsData = [
  { name: "Sorvete de Chocolate", value: 30 },
  { name: "Açaí Premium", value: 25 },
  { name: "Sundae Tropical", value: 20 },
  { name: "Casquinha Mista", value: 15 },
  { name: "Milkshake", value: 10 },
];

const COLORS = ["#FEC6A1", "#FFDEE2", "#FDE1D3", "#a67f65", "#f0d2c2"];

const AdminDashboard = () => {
  // State for date range
  const [dateRange, setDateRange] = useState("month");
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sorbet-dark">Dashboard</h1>
        
        <div className="flex gap-2">
          <Button 
            variant={dateRange === "day" ? "default" : "outline"}
            className={dateRange === "day" ? "bg-sorbet-orange text-sorbet-dark" : ""}
            onClick={() => setDateRange("day")}
          >
            Hoje
          </Button>
          <Button 
            variant={dateRange === "week" ? "default" : "outline"}
            className={dateRange === "week" ? "bg-sorbet-orange text-sorbet-dark" : ""}
            onClick={() => setDateRange("week")}
          >
            Semana
          </Button>
          <Button 
            variant={dateRange === "month" ? "default" : "outline"}
            className={dateRange === "month" ? "bg-sorbet-orange text-sorbet-dark" : ""}
            onClick={() => setDateRange("month")}
          >
            Mês
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Vendas Totais</CardDescription>
            <CardTitle className="text-3xl font-bold text-sorbet-dark">R$ 25.680,00</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pedidos</CardDescription>
            <CardTitle className="text-3xl font-bold text-sorbet-dark">345</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Valor Médio</CardDescription>
            <CardTitle className="text-3xl font-bold text-sorbet-dark">R$ 74,43</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Novos Clientes</CardDescription>
            <CardTitle className="text-3xl font-bold text-sorbet-dark">87</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
                <Bar dataKey="vendas" fill="#FEC6A1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {topProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`, "Percentual"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Produtos Recentes</CardTitle>
            <Link to="/admin/produtos">
              <Button variant="link" className="text-sorbet-orange hover:text-sorbet-orange/80">
                Ver Todos
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtos.slice(0, 5).map((produto) => (
                  <tr key={produto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={produto.imagem} alt={produto.nome} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
