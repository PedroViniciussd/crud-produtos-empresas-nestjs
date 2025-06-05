# API CRUD de Produtos e Empresas com NestJS e Prisma

## Visão Geral

Este projeto implementa uma API REST para gerenciar **Produtos** e **Empresas** utilizando o framework **NestJS** com **Prisma ORM** para acesso ao banco de dados. A API suporta operações básicas de CRUD (Create, Read, Update, Delete) para ambas as entidades.

## Tecnologias Utilizadas

- Node.js com NestJS (framework sobre Express.js)
- Prisma ORM para manipulação do banco de dados (PostgreSQL, MySQL, etc)
- TypeScript para tipagem estática
- Swagger para documentação automática da API
- ValidationPipe do NestJS para validação dos dados recebidos
- Uso de DTOs para definir e validar os formatos de dados das requisições

## Estrutura do Projeto

### Endpoints criados

| Método | Rota               | Descrição                        | Acesso           |
|--------|--------------------|---------------------------------|------------------|
| POST   | /v1/empresa        | Criar nova empresa               | Público          |
| GET    | /v1/empresa        | Listar todas as empresas         | Público          |
| GET    | /v1/empresa/:id    | Buscar empresa pelo ID           | Público          |
| PATCH  | /v1/empresa/:id    | Atualizar empresa                | Público          |
| DELETE | /v1/empresa/:id    | Deletar empresa                  | Público          |
| POST   | /v1/produto        | Criar novo produto (associado a empresa) | Público    |
| GET    | /v1/produto        | Listar todos os produtos com dados da empresa | Público  |
| GET    | /v1/produto/:id    | Buscar produto pelo ID           | Público          |
| PATCH  | /v1/produto/:id    | Atualizar produto                | Público          |
| DELETE | /v1/produto/:id    | Deletar produto                  | Público          |

### Observações:
- O prefixo global da API é `/v1`
- Todos os endpoints estão configurados como públicos (sem necessidade de autenticação), usando o decorator customizado `@IsPublic()`
- As operações respeitam validação de dados com `class-validator` (ex: nome deve ser string não vazia, preço número positivo, empresaId inteiro)
- O relacionamento Produto → Empresa é mantido via chave estrangeira `empresaId`, garantindo integridade referencial no banco de dados.

## Modelo Prisma (schema.prisma)

\`\`\`prisma
model Empresa {
  id        Int       @id @default(autoincrement())
  nome      String
  cnpj      String
  telefone  String?
  produtos  Produto[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Produto {
  id        Int      @id @default(autoincrement())
  nome      String
  preco     Float
  empresaId Int
  empresa   Empresa  @relation(fields: [empresaId], references: [id])
}
\`\`\`

## Exemplos de Requests válidos

### Criar Empresa

\`\`\`json
POST /v1/empresa
{
  "nome": "Empresa Teste",
  "cnpj": "15245767567675",
  "telefone": "123456789"
}
\`\`\`

### Criar Produto

\`\`\`json
POST /v1/produto
{
  "nome": "Creatina 250g",
  "preco": 120.00,
  "empresaId": 1
}
\`\`\`

## Estrutura dos DTOs

Exemplo de DTO para criação de Produto (`CreateProdutoDto`):

\`\`\`typescript
export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsInt()
  empresaId: number;
}
\`\`\`

## Configuração do NestJS

- Prefixo global da API: `/v1`
- Swagger ativado via variável de ambiente para documentação
- Uso do `ValidationPipe` para validar os dados das requisições
- Segurança mínima via decorator `@IsPublic()` para permitir endpoints públicos
- Configuração de CORS aberta para facilitar testes

## Como testar

- Rodar o servidor: `npm run start`
- Usar o Postman, Insomnia ou curl para testar as rotas conforme exemplos acima (Testado com Postman)
- A documentação Swagger está disponível em `/v1/docs` (se ativada)

## Contato

Para dúvidas ou mais informações, fico à disposição!
