## *Account Manager API - Cubos Case*

## Overview

Esta Aplicação é responsável por gerenciar contas, cartões e transações de um usuário.

## Features

-   Fluxo de autenticação 
-   Criação e litagem das entidades: People, Account, Card e Transaction 
-   Consultar o saldo de uma conta
-   Realizar transações

## Frameworks e Ferramentas

-   Nest: Framework open source para typescript
-   Prisma: ORM para banco de dados relacional (Postgres)
-   JWT e Passport para autenticação e validação de usuário
-   Swagger para documentação

## Hand's on
### Running Locally

1. git clone https://github.com/isadoraalbano/cubos-case-api.git
2. npm install
3. cp .env.example .env
4. npx run migrate deploy 
5. npm run start:dev
6. Acesso swagger pelo URL: localhost:3000/api/docs#/

## Artifacts

-   Linguagem predominante de desenvolvimento Typescript;
-   Banco de dados Postgres.
