import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";

import HomePage from "./pages/HomePage";
import CardapioPage from "./pages/CardapioPage";
import PromocoesPage from "./pages/PromocoesPage";
import SobrePage from "./pages/SobrePage";
import ContatoPage from "./pages/ContatoPage";
import CarrinhoPage from "./pages/CarrinhoPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProdutos from "./pages/admin/AdminProdutos";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminLayout from "./pages/admin/AdminLayout";
import ProdutoDetailPage from "./pages/ProdutoDetailPage";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cardapio" element={<CardapioPage />} />
              <Route path="/produto/:id" element={<ProdutoDetailPage />} />
              <Route path="/promocoes" element={<PromocoesPage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/carrinho" element={<CarrinhoPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="produtos" element={<AdminProdutos />} />
                <Route path="pedidos" element={<AdminPedidos />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
