# 🍦 Sorveteria Web – Sistema Completo com Frontend e Backend Simulado

Este projeto é um sistema web completo para uma sorveteria, com páginas públicas, área administrativa e toda a lógica simulada no frontend usando `localStorage` e cache em memória. Ideal para prototipagem ou projetos estáticos sem necessidade de backend real.

## 🔗 Acesse o projeto

[Visualizar Aplicação Online](https://semlinkporenquanto.com) 

## 📂 Funcionalidades

### Público Geral
- Página inicial com destaques
- Menu de produtos (massa, casquinha, por quilo, combinações)
- Promoções ativas
- Sobre a empresa
- Contato com formulário
- Carrinho de compras

### Autenticação
- Login para três perfis:
  - Cliente
  - Funcionário
  - Administrador
- Simulação de sessão com `localStorage`

### Administrativo
- Dashboard com visão geral
- Cadastro, edição e exclusão de produtos
- Visualização de mensagens recebidas
- Gerenciamento de promoções

## 💻 Tecnologias Utilizadas

- **Vite**
- **React + TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (UI components)
- **localStorage / cache em memória** (para simular backend)
- **Bootstrap & jQuery** (em áreas específicas do frontend)

## 🚀 Como rodar localmente

Siga os passos abaixo para clonar e rodar o projeto localmente:

```bash
# 1. Clone o repositório
git clone <SEU_LINK_DO_REPOSITORIO>

# 2. Acesse o diretório do projeto
cd nome-do-projeto

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
