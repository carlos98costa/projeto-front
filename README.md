# Projeto Front-End

Front-end React do projeto do segundo bimestre.

## O que este repositório entrega na Parte 2

- `Dockerfile` para gerar a imagem com Nginx.
- `.dockerignore` para reduzir o contexto de build.
- Integração com a API do Render via `VITE_API_URL`.
- Preparação para deploy na Vercel.
- Evidências de execução e deploy na pasta `media/`.

## Como o front conversa com a API

O aplicativo consome as rotas:

- `GET /`
- `GET /v1`

A URL base da API é informada por `VITE_API_URL`.

Exemplo local:

```bash
VITE_API_URL=http://localhost:5000
```

Exemplo em produção:

```bash
VITE_API_URL=https://sua-api.onrender.com
```

## Execução local sem Docker

```bash
npm install
npm run dev
```

## Execução com Docker

```bash
docker build --build-arg VITE_API_URL=http://localhost:5000 -t projeto-front .
docker run --rm -p 8080:80 projeto-front
```

## Deploy

O deploy real continua na Vercel.

## Evidências

A pasta `media/` deve conter prints de:

1. Front aberto na porta `8080` em container com Nginx.
2. Front consumindo a API do back-end em container na porta `5000`.
3. Painel `Deployments` da Vercel.
4. Evidência da tag `v1.1.0`.
