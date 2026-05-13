# Projeto Front-End

Front-end simples em React para o projeto do segundo bimestre.

## Conteúdo

- `src/App.jsx`: interface que consome a API do backend.
- `vite.config.js`: configuração Vite.
- `.github/workflows/release.yml`: workflow GitHub Actions acionado por tag.
- `media/`: espaço para evidências de deploy.

## Deploy

Este repositório foi preparado para deploy na Vercel via GitHub Actions usando os secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

O workflow é acionado exclusivamente por push de tags no formato `vX.Y.Z`.
