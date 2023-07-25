# Projeto 02 - REST API

O segundo projeto da trilha atualizada de Node.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) ensina como desenvolver uma REST API utilizando Fastify, Knex, TypeScript e outras ferramentas para auxiliar durante o desenvolvimento.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
  - [Getting started](#getting-started)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Questions](#questions)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

O objetivo é construir um *back-end* para criação e recuperação de transações financeiras fictícias. A REST API desenvolvida neste módulo permite receber requisições POST para criação e GET para listagem de todas as transações, de uma específica e do resumo total por usuário. A identificação de um usuário é feita por *cookies*.

### The challenge

#### Requisitos funcionais

- [x] O usuário deve poder criar uma transação;
- [x] O usuário deve poder listar todas suas transações;
- [x] O usuário deve poder recuperar uma transação específica;
- [x] O usuário deve poder obter um extrato (resumo) de todas suas transações.

#### Regras de negócio

- [x] A transação pode ser do tipo crédito que será somada ao total atual, ou débito que será subtraída;
- [x] Um usuário deve ser devidamente identificado bem como suas transações;
- [x] Um usuário só pode visualizar suas próprias transações.

#### Requisitos não-funcionais

- [x] Exceções devem ser devidamente tratadas.

#### Endpoints

- POST /transactions: create a new transaction
  The body should contain `{ title: string, amount: number, type: 'credit' | 'debit' }`

- GET /transactions: retrieve all transactions of a user

- GET /transactions/:id: retrieve a specific transaction

- GET /transactions/summary

### Links

- [Remote repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/nodejs/rest-api)

- [Live preview](https://ignite-rest-api-jvmdo.onrender.com) - The hosting platform tear free services down after 90 days. Hence, the live preview may or may not be working at time of your usage.

### Getting started

In case the live preview is not working, you can build the service locally in your machine:

1. Clone the repository;
2. Go to this project directory;
3. Run `npm install`;
4. Run `npm run build`;
5. Run `node build/server.js`

Then, make POST and GET requests to `/transactions` from you favorite HTTP client.

## My process

A cada aula, fiz anotações de conceitos importantes para o entendimento e de pontos-chave do processo de desenvolvimento. As anotações foram divididas em *commits*.

Após o fim de cada aula, implementei o que foi ensinado, sempre lendo minhas anotações, pesquisando nas documentações e evitando ter que rever o código do instrutor. Repeti esse procedimento para cada commit até finalizar o projeto.

### Built with

- Node.js
- Fastify (and @/cookie)
- Knex
- SQLite / PostgreSQL
- Zod
- TypeScript
- Vitest
- Supertest
- tsup

### What I learned

#### Fastify

Fastify is a micro-framework for building backend applications with Node.js. It is designed to be fast, lightweight and easy to use to create performant and scalable web services.

Fastify has three core concepts: routes, plugins and hooks.

Routes are the basic building blocks of a Fastify application. They define how the application responds to different HTTP requests. A route consists of a method (such as `GET`, `POST`, etc.), a URL path (such as `/users`, `/posts`, `/comments`, etc.) and a handler function that executes some logic and returns a response.

Plugins are reusable pieces of code that can extend the functionality of a Fastify application. They can register routes, hooks, custom serializers, decorators and more. Plugins can also depend on other plugins and create a modular architecture for your application.

Hooks are functions that are executed before or after certain events in the Fastify lifecycle. They can be used to modify the request or the response, perform validations, handle errors and more.

#### Knex

Knex is a powerful and flexible query builder for Node.js applications. It allows you to write SQL queries in a JavaScript syntax, without having to worry about the differences between different database dialects. Knex also supports migrations, seeds, transactions, and other advanced features that make working with databases easier and more efficient.

#### Vitest

Vitest is a testing framework for JavaScript that aims to provide a fast, reliable and easy-to-use way to write and run tests for web applications. It's fully compatible with Jest API with the advantage of being more performant and easier to setup.

#### Supertest

Supertest is a library for testing HTTP servers and APIs in Node.js. It is based on the popular Superagent library, which provides a fluent and expressive interface for making HTTP requests. Supertest allows you to write assertions about the status code, headers, body, and cookies of the HTTP response, using a familiar syntax that resembles Superagent.

The first concept of Supertest is the `request` function, which creates a new instance of the Supertest agent. The `request` function can take either a URL or an Express app as an argument.

The second concept of Supertest is the `expect` method, which allows you to write assertions about the HTTP response. The `expect` method can take either a number, a string, a regular expression, a function, or an object as an argument.

The third concept of Supertest is the `send` method, which allows you to send data along with the HTTP request. The `send` method can take either a string, a buffer, or an object as an argument. You can also use `set` to send cookies.

#### Some other points

1. Node.js does not support TypeScript by default. You have to install and configure it.

2. `tsx` is a tool that automates the compilation and execution of TypeScript in Node.js. Keep in my that it’s recommend for development only.

3. How to configure TypeScript for Node.js.

4. How to configure ESLint for Node.js.

5. ~~It seems `knex` has issues related to TypeScript, ESModules or something. I got errors when using the docs getting started code. I fixed the errors importing the default from `knex` then using its `.default({})` method.~~ See related link below.

6. Migrations serves as a version control for the database. Migrations are the history of all the changes in the database.

7. The `.env.example` file helps others devs to figure out which environment variables they need to set. The file contains the key without its value.

8. Knex’s Schema Builder functions do need to be returned! Don’t forget the `return`! Or you can `await` instead of returning. How does it even work?

9. Cookies are automatically received/sent by Thunder Client. The available cookies are in the `cookies` tab.

10. Set Fastify Cookie’s `parseOptions` on `register` for global configuration. Set on `reply.cookie()` for specific ones.

11. Vitest over Jest because the later needs more configuration. Vitest has the same API as Jest, while is faster.

12. End-to-end tests with Vitest.

    1. Since Fastify plugins are asynchronous, we need to wait `app.ready()` before all tests start running;

    2. After all, `app.close()`.

13. One test case should not depend on another one, which implies that we cannot directly pass data from one test to another. Each test should be independent and self-contained to ensure reliable and consistent test results.

14. `process.env.NODE_ENV` is automatically set to `test` by Vitest.

15. In order to remove a file that is being tracking by git, first run `git rm --cached <file>`, add it to `.gitignore` then commit the changes.

16. `moduleResolution: NodeNext` introduces `expression not callable` when invoking `createKnex` in `database.ts`. Change it to `Node` resolves the issue, which also makes `tsup` work.

17. `tsup` build process won’t work unless I set its configuration in `package.json`.

18. `"ignorePatterns": []` is an alternative to `.eslintignore`.

### Questions

1. Which body schema should I use? Zod or the Fastify's native one?

2. Where should I do schema validation? On event (with hooks) or within the endpoint implementation?

### Useful resources

- [Importing Knex into ESM](https://dev.to/asteinarson/typescript-node-js-importing-knex-into-es6-module-1poc) - This helped me to resolve the Knex importing issues.

- [Fastify/cookie Options](https://www.npmjs.com/package/cookie#options-1)

- [Learn Fastify Hooks and Middlewares](https://blog.appsignal.com/2023/05/24/advanced-fastify-hooks-middleware-and-decorators.html)

- [How to setup tsup](https://caspertheghost.me/blog/how-to-create-an-npm-package-tsup-esm-cjs-nodejs)

- [About Node engines](https://www.marcusoft.net/2015/03/packagejson-and-engines-and-enginestrict.html)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

## Step tracker

### ~~chore: project setup~~

- [x]  Install TypeScript
    1. `npm i -D typescript`
    2. `npx tsc --init`
        1. `es2020`
    3. `npm i -D @types/nodes`
    4. `npm i -D tsx`
        1. `npx tsx src/server.ts`
    5. Create NPM script `dev`
        1. `tsx watch src/server.ts`
    6. Maybe change `tsconfig.json` `module` to `ESNext` and `moduleResolution` to `NodeNext`
- [x]  Configure ESLint
    1. `npm i -D eslint`
    2. `npm i -D @rocketseat/eslint-config`
    3. `.eslintrc.json`
        1. `extends` `@rocketseat/eslint-config/node`
    4. `lint: eslint src --ext .ts --fix`
- [x]  Install Fastify
    1. Start up a Hello World server
- [x]  Install Knex
    1. `npm i knex sqlite3`
    2. Setup connection on `database.ts`
    3. Select all from sqlite_schema
    4. Ignore db file

### ~~chore: setup migrations~~

- [x]  Migrations
    1. `.knexfile.ts`
        1. Import db config
        2. Export as default
        3. `knex: node --no-warnings --loader tsx ./node_modules/.bin/knex`
    2. `npm run knex -- migrate:make create-transactions`
    3. `config: Knex.Config`
        1. `migrations: { ext, dir }`

### ~~chore: environment variables~~

- [x]  create `.env` file
- [x]  `npm i dotenv`
- [x]  `import 'dotenv/config`
    1. database.ts
    2. the `process.env` has now access
- [x]  Ignore
- [x]  Create `.env.example`
- [x]  `src/env/index.ts`
    1. `envSchema`
    2. Parse `process.env`
    3. Export `env`

### ~~feat: add transactions table~~

- [x]  up `knex.schema.createTable()`
    1. Primary `id`, Text `title`, Decimal `amount`, Timestamp `created_at`
    2. `npm run knex -- migrate:latest`
- [x]  down `dropTable`
- [x]  add session id
    1. `knex.schema.alterTable()`
    2. migrate
- [x]  Make knex queries to test the table
    1. Return inserted data
    2. Select all

### ~~chore: add types to Knex tables~~

- [x]  `@types/knex.d.ts`

### ~~feat[routes/transactions]: POST~~

- [x]  Parse `request.body` with Zod
    1. `title`, `amount`, `type`
    2. amount > 0, type credit/debit
    3. try/catch
- [x]  Insert into table
- [x]  Reply 201 or 404 only

### ~~feat[routes/tr]: GET | list all~~

- [x]  Select everything from table

### ~~feat[routes/tr]: GET | by id~~

- [x]  Zod parse params
- [x]  Check if transaction was found

### ~~feat[routes/tr]: GET | summary~~

- [x]  Sum all values of a column

### ~~feat[routes/tr]: cookies~~

- [x]  `npm i @fastify/cookie`
- [x]  It’s a plugin. Import it, register it.
- [x]  On POST,  retrieve `sessionId` from cookies. Generate a new `session_id` if it does not exist already.

### ~~refactor[routes/tr]: add check-session middleware~~

`middlewares/get-session-or-throw`

1. On GET, reply 401 if there is no cookie. Otherwise, filter listing by `session_id`
2. `{preHandler: [checkSession]`
    1. Or global hook it!

### ~~chore: setup for e2e tests~~

- [x]  `npm i -D vitest`
- [x]  `test: vitest` then `npm test`
- [x]  `npm i -D supertest @types/supertest`
    1. `app.ts` // `server.ts`
- [x]  `.env.test` // `.env.example.test`
    1. Contains test environment variable
        1. test db file
    2. Ignore
- [x]  On `env/index.ts`, if `test, config({path: '.env.test'}), else confi()`
- [x]  `test/*.test.ts`
- [x]  Run migrations (rollback all, latest) before each test using  Node.js’ `execSync`

### ~~test[tests/transactions]: POST~~

### ~~test[tests/tr]: GET | list all~~

### ~~test[tests/tr]: GET | by id~~

- [x]  Create, then list all (actually db stores only one record). Get the [0] then make the GET `id`

### ~~test[tests/tr]: GET | summary~~

- [x]  Create at least 2, set the same cookie, make the request

### ~~chore: deployment configuration~~

- [x]  `npm i -D tsup`
    1. `build: tsup src --out-dir build`
    2. `node build/server.js`
        1. log it!
    3. `.eslintignore`
    4. Ignore (categorize)
- [x]  Create Render PostgreSQL
- [x]  `env/index.ts`
    1. Add `DATABASE_CLIENT` enum
        1. Add to `.env` files
        2. Change `database.ts` `client` configuration
        3. Change `connection` aw
- [x]  `npm i pg`
    1. Move `sqlite` to dev dependencies
    2. `engine: node >= 18`
- [x]  Copy internal URL
- [x]  Import repository, create Render project
    1. Root directory!
    2. `npm install && npm run build && npm run knex -- migrate:latest`
    3. `node build/server.js`
    4. Advanced → env variables
- [ ]  Copy live URL, be happy!
