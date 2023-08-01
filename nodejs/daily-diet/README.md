# Desafio 02 - Daily Diet API

O segundo desafio da trilha atualizada de Node.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) exige do aluno desenvolver uma REST API utilizando Autenticação, Fastify, Knex, TypeScript e outras ferramentas para auxiliar durante o desenvolvimento.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Getting started](#getting-started)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Questions](#questions)
  - [Continued Development](#continued-development)
- [Author](#author)

## Overview

O objetivo é construir o *back-end* do aplicativo [Daily Diet](https://www.figma.com/community/file/1218573349379609244), que consiste em uma REST API com autenticação de usuários e CRUD de refeições.

### The challenge

#### Requisitos funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

#### Regras de negócio

- [x] Deve ser possível identificar o usuário entre as requisições
- [x] O usuário só pode visualizar, editar e apagar suas próprias refeições
- [x] As senhas devem ser armazenadas em formas de hash

#### Requisitos não-funcionais

- [x] Utilizar JWT para autorização e identificação de usuários
- [x] Exceções devem ser devidamente tratadas.

#### Endpoints

##### Authentication

- POST /sign-up: create a new user account

- POST /sign-in: log an user in

##### CRUD

- POST /meals: create a new meal
  The body should contain `{ name: string, description: string, datetime: string, diet: boolean }`

- GET /meals: retrieve all meals of an user

- GET /meals/:id: retrieve a specific meals of an user

- GET /meals/total: retrieve the total number of meals of an user

- GET /meals/diet: retrieve the total number of in diet meals of an user

- GET /meals/non-diet: retrieve the total number of non-diet meals of an user

- GET /meals/sequence: retrieve the longest sequence of in diet meals of an user

- PUT /meals/:mealId: update one or all attributes of a meal of an user

- DELETE /meals/:mealId: delete a specific meal of an user

### Getting started

You can build and test the service locally in your machine:

1. Clone the repository;
2. Go to this project directory (/nodejs/daily-diet);
3. Run `npm install`;
4. Run `npm run build`;
5. Run `node build/server.js`

Then, make requests from you favorite HTTP client.

## My process

First and foremost, I completed all the necessary configurations (TypeScript, ESLint, Env variables, Knex migrations) to get the project ready for development. To achieve this, I followed the steps I learned in the lessons from this module.

I started off implementing the authentication endpoints (sign up and sign in) and then I proceeded to develop meals CRUD. For every endpoint, I wrote a commit because I am following the atomic approach.

Subsequently, I added the authorization middleware using JWT as strategy, to ensure proper security for the CRUD operations.

As part of improving code readability and reusability, I performed some refactoring in the CRUD’s code. I also introduced password encryption.

Lastly, I completed the development process by writing end-to-end tests for each API endpoint.

### Built with

- Node.js
- Fastify (and @/auth, @/jwt)
- Knex
- SQLite / PostgreSQL
- Zod
- TypeScript
- bcrypt
- Vitest
- Supertest
- Faker.js
- dotenv
- tsup

### What I learned

#### JWT (Json Web Token)

1. JWT can be used for both authorization and identification of users since it carries encoded information known as claims, which can include data such as the users’ ID, username, roles, etc.

2. On user sign up or sign in, a JWT token is created and issued to the client-side, where it is stored.

3. For every subsequent request the user makes to the API, the JWT should be included in the Authorization header.

4. On the server-side, the JWT’s signature is decoded and verified. The decoded token contains the user data.

5. JWTs should not store sensitive information, as they can be decoded by anyone.

#### Some other points

1. Knex table columns autocomplete does not work with `.insert().into()`. However, it does work with `knex().insert()`

2. How to use `@fastify jwt`

3. How to use `@fastify auth`

4. In `supertest`, use `.auth(token, { type 'bearer' })` to set an access token on request

5. It not a good idea to instantiate `supertest` on global scope. By creating a new `supertest` instance for each test, you guarantee that each test starts with a clean and isolated state, reducing the risk of interference between tests

6. Faker.js is very useful for testing

7. To resolve the error “direct import is not supported”, add `index.js` at the end of the import statement

### Questions

1. Within `mealsRoutes`, I need to retrieve `const userId = request.user.id` in each endpoint. Is there a way to make `userId` available globally within the scope, so I don't have to repeat it in every endpoint?

2. I got some TypeScript errors in `app.ts` and `routes` after adapting the project to build. The API still works as intended tho.
    1. The `jwt` instance error in `app.ts` I fixed by including `jwt.js` at the end of import.

### Continued Development

1. Refresh token
    1. Refresh token value, expire date and its user id are stored in database.
    2. Return both access and refresh tokens on sign in.
    3. When a new access token is requested, check if refresh token is valid.

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)
