# API - Semana 3
Se você está na trilha de front-end, você provavelmente vai precisar saber como rodar a esta API para usar junto com o React. Nesta pequena documentação estão detalhes sobre como rodar a API e sobre as rotas possíveis.

## Como rodar o sistema
Primeiramente, é preciso adicionar um arquivo chamado `.env` na pasta `Semana 3` com o seguinte conteúdo:
```.env
SECRET_KEY='^Q[y5F)3Fw`<A.QmQHoP~8^/sa%@c6/S33^Z#C(ZwSQx3"h)7]"\]6'
JWT_EXPIRATION='15d'
APP_URL='http://localhost:3000'
NODE_ENV='development'
```

Para rodar o sistema, você pode usar o comando `npm i` para instalar as dependências (caso seja a primeira vez rodando) e o comando `npm start` para rodar de fato a API.

## Rotas
### Login
Rota para fazer login no sistema, ou seja, obter o token JWT necessário para autenticação. Ele é automaticamente adicionado aos cookies do navegador.

- **URL:** /usuarios/login
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
    - `email=[string]`
    - `senha=[string]`
- **Autenticação:** Não
- **Resposta de sucesso:**
    - **Status**: 200
    - **Conteúdo**: `{ id, email }`

### Logout
Rota para fazer logout do sistema. Isso equivale a remover do navegador o cookie que armazena o token 

- **URL:** /usuarios/logout
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 204
    - **Conteúdo**: Vazio

### Criar usuário
Rota usada para criar um novo usuário no sistema.

- **URL:** /usuarios/
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
    - `nome=[string]`
    - `email=[string]`
    - `senha=[string]`
- **Autenticação:** Não
- **Resposta de sucesso:**
    - **Status**: 201
    - **Conteúdo**: Vazio
 
### Ver todos os usuários
Rota usada para ver todos os usuários do sistema.

- **URL:** /usuarios/
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 200
    - **Conteúdo**: Array de usuários com a estrutura `{id, nome, email, createdAt}`

### Ver usuário específico
Rota para ver os dados de um usuário específico

- **URL:** /usuarios/:id
- **Método:** `GET`
- **URL params:** 
    - `id=[integer]` 
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 200
    - **Conteúdo**: `{id, nome, email, createdAt}`

### Editar usuário
Rota para atualizar dados de um usuário. Só é permitido alterar nome e senha. Além disso, um usuário pode editar a si mesmo, mas não outros usuários

- **URL:** /usuarios/:id
- **Método:** `PUT`
- **URL params:** 
    - `id=[integer]` 
- **Data params:**
    - `nome=[string]` 
    - `email=[string]` 
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 204
    - **Conteúdo**: Vazio

### Deletar usuário
Rota para deletar um usuário. Um usuário pode deletar a si mesmo, mas não outros usuários. O token de autenticação é removido dos cookies.

- **URL:** /usuarios/:id
- **Método:** `DELETE`
- **URL params:** 
    - `id=[integer]`
- **Data params:** Não 
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 204
    - **Conteúdo**: Vazio

### Criar jogo
Rota usada para adicionar um jogo ao sistema.

- **URL:** /jogos/
- **Método:** `POST`
- **URL params:** Não
- **Data params:**
    - `nome=[string]`
    - `preco=[float]`
    - `genero=[string]`
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 201
    - **Conteúdo**: Vazio

### Ver todos os jogos
Rota usada para ver todos os jogos cadastrados. Também trás dados sobre o usuário que adicionou o jogo.

- **URL:** /jogos/
- **Método:** `GET`
- **URL params:** Não
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 200
    - **Conteúdo**: Array de jogos com a estrutura `{id, nome, preco, genero, createdAt, {id, nome}}`

### Ver jogo específico
Rota usada para ver dados de um jogo específico. Também trás dados sobre o usuário que adicionou o jogo.

- **URL:** /jogos/:id
- **Método:** `GET`
- **URL params:**
    - `id=[integer]` 
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 200
    - **Conteúdo**:  `{id, nome, preco, genero, createdAt, {id, nome}}`

### Editar jogo
Rota usada para editar dados de um jogo. Apenas o usuário que adicionou o jogo ao sistema pode editá-lo.

- **URL:** /jogos/:id
- **Método:** `PUT`
- **URL params:**
    - `id=[integer]` 
- **Data params:**
    - `nome=[string]`
    - `preco=[float]`
    - `genero=[string]`
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 204
    - **Conteúdo**: Vazio

### Deletar jogo
Rota usada para deletar um jogo. Apenas o usuário que adicionou o jogo ao sistema pode deletá-lo.

- **URL:** /jogos/:id
- **Método:** `DELETE`
- **URL params:**
    - `id=[integer]` 
- **Data params:** Não
- **Autenticação:** Sim
- **Resposta de sucesso:**
    - **Status**: 204
    - **Conteúdo**: Vazio
