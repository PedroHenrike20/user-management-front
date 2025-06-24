# People's Consultoria — Frontend

Frontend da aplicação da People's Consultoria, desenvolvido com React.

## 📷 Preview

[![](https://vercel-preview-url.vercel.app/screenshot.png)](https://user-manegement-front.vercel.app/)

## 🚀 Tecnologias

- React
- TypeScript
- React Router
- Tailwind
- Docker
- Vite
- Axios

## 🧰 Pré-requisitos

- Node.js (v18+)
- Docker (opcional)
- Git

## 📦 Instalação local

### 1. Clone os repositórios

Clone os repositórios do **frontend** e do **backend** dentro de uma mesma pasta. A estrutura deve ficar assim:

```text
/nome-da-sua-pasta
├── backend
└── frontend
```

```bash
git clone https://github.com/PedroHenrike20/user-manegement-front
git clone https://github.com/PedroHenrike20/user-manegement-back
```

### 2. Crie o arquivo `docker-compose.yml`

Dentro da raiz da pasta (onde estão as pastas `frontend` e `backend`), crie um arquivo chamado `docker-compose.yml` e adicione o seguinte conteúdo:

```yaml
version: "3.8"

services:
  db:
    image: postgres:15
    restart: always
    container_name: postgres_db
    environment:
      POSTGRES_USER: name_user_db
      POSTGRES_PASSWORD: password_db
      POSTGRES_DB: name_db
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
    container_name: backend_service
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_HOST: host_db
      DATABASE_PORT: 5432
      DATABASE_USER: user_db
      DATABASE_PASSWORD: password_db
      DATABASE_NAME: name_db
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run start:dev

  frontend:
    build:
      context: ./frontend
    container_name: frontend_app
    ports:
      - "3001:80"
    depends_on:
      - backend

volumes:
  db_data:
```

### 2. Suba os containers

Execute o comando abaixo na raiz do projeto (onde está o docker-compose.yml):

```bash
docker-compose up --build
```

## Endpoints e Acesso:

- Frontend: http://localhost:3001

- Backend (API): http://localhost:3000

- Banco de dados (Postgres): Porta 5432

## 📝 Observações

- Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.

- Caso deseje encerrar os containers, use Ctrl + C no terminal e depois docker-compose down para remover os containers criados.
