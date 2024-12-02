# Project Setup

Este repositório contém o projeto de backend. Para iniciar o servidor local e configurar o ambiente de desenvolvimento, siga os passos abaixo.

## Requisitos

- Docker
- Node.js 22 (caso utilize o NVM, ele irá configurar a versão automaticamente)

## Passos para iniciar o servidor local

### 1. Subir os containers com o Docker Compose

Para iniciar os containers necessários, execute o seguinte comando:

```bash
docker-compose up -d
docker ps -a
cp .env.example .env
npm run migration:local:up
npm run seed:local:up
```

### Executar container em modo development
```bash
npm run dev
```

### Executar container em modo production
```bash
npm run start
```

### Executar teste unitarios e integração
```bash
npm run test
```
### 2. Execução do swagger

Inicie o swagger na rota /api