# 🧭 Frontend Challenge - Next.js + TypeScript

Este projeto foi desenvolvido como parte de um processo seletivo para a vaga de **Desenvolvedor(a) Frontend Pleno**. O objetivo é demonstrar domínio técnico nas tecnologias exigidas, com foco em boas práticas, performance, consistência visual e reutilização de componentes.

---

## ✅ Tecnologias e Ferramentas Utilizadas

- **Next.js (App Router)**
  - Rotas protegidas com autenticação via JWT
  - Implementação de refresh token
  - Uso de **Server Components**

- **TypeScript**
  - Tipagem estática para maior segurança e legibilidade do código
  - Validação com **Zod** + `react-hook-form`

- **React Query**
  - Exemplos: Cache, background fetching, controle de estados e paginação.

- **Tailwind CSS**
  - Design responsivo com utilitários
  - Componentes reutilizáveis como botões, modais, badges

- **Docker + Docker Compose**
  - Ambiente de desenvolvimento containerizado
  - Suporte completo ao comando `docker compose up`

- **CI com GitHub Actions**
  - Pipeline com etapas de lint, format, testes e build

- **Kubb**
  - Geração automática de hooks e models a partir do schema OpenAPI (`schema.yaml`)

---

## 🚀 Como Rodar o backend API

### Pré-requisitos

- Docker e Docker Compose instalados

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/SejaSenfio/2025.2-front-onboard_API.git challenge-backend
   ```

2. Dentro do projeto há o arquivo README.md, que contém as instruções de como rodar o projeto

---

## 🧪 Pontos Avaliados

### 📌 Consistência Visual

- Utilização de um design limpo, responsivo e padronizado com Tailwind.
- Componentes com aparência uniforme e reutilizável.

### ♻️ Reutilização de Componentes

- Componentização de UI com foco em legibilidade e reaproveitamento.
- Exemplos: `<Button />, <Modal />, <Badge />`.

### 📱 Responsividade

- Layout adaptável para diferentes tamanhos de tela (mobile-first).

### 🛡️ Robustez da Aplicação

- Autenticação JWT com refresh token
- Tratamento de erros de API
- Proteção de rotas

### 📚 Boas Práticas

- Uso de tipagem estática com TypeScript
- Validação de dados com Zod
- Organização de pastas e responsabilidades claras

### 🛠️ Kubb Setup

- A partir do arquivo schema.yaml, a geração dos hooks foi feita com base no kubb.config.ts.

### 🧰 Utilização do Escopo Definido

- API consumida com React Query e hooks gerados pelo Kubb
- Arquivo .dockerignore e .gitignore preenchidos
- Integração CI com GitHub Actions
- Scripts de lint, format, testes e build configurados
- Utilização de Docker e Docker Compose

---

## 📝 Entrega

- Para realizar a entrega, basta clonar(não utilize fork) o repositório e, ao finalizar o desafio, publicá-lo em seu perfil do GitHub. Após isso, envie o link do seu repositório para o contato previamente informado.

---

Feito com ❤️ para a oportunidade de fazer parte da equipe!
