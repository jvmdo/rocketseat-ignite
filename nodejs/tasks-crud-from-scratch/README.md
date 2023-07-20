# Desafio 01 - Fundamentos de Node.js

O primeiro desafio da trilha atualizada de Node.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) testa a compreensão do aluno no desenvolvimento de uma REST API utilizando utilizando apenas módulos nativos do Node.js.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Getting started](#getting-started)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Questions](#questions)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

O projeto consiste em implementar uma REST API para realizar CRUD de *tasks* em um banco de dados (arquivo JSON).

### The challenge

#### Features

- ✓ Criação de *tasks* em requisições POST
- ✓ Listagem de *tasks* (opcionalmente filtradas por `title` ou `description`) em requisições GET
- ✓ Atualização de uma *task* pelo `id` em requisições PUT
- ✓ Remoção de uma *task* pelo `id` em requisições DELETE
- ✓ Atualização do status `completedAt` pelo `id` de uma *task* em requisições PATCH
- ✓ Importação de *tasks* em massa de um arquivo CSV

### Getting started

1. Clone o repositório para sua máquina
2. Acesse-o e execute o comando `npm install` para instalar a biblioteca `csv-parser`
3. Execute o comando `npm run dev` para iniciar um servidor na URL `http://localhost:3333`
    - Na primeira execução, o arquivo *filler-tasks.csv* será carregado e cada linha será convertida e armazenada no banco de dados (*db.json*) em formato JSON.
4. Faça requisições HTTP por um *client* na rota `/tasks` e `/tasks/taskId`
    - Para criação de *tasks*, envie um objeto contento `title` e `description`
    - Também é possível fazer uma listagem filtrada por essas mesmas propriedades

## My process

O desafio é bem parecido com o projeto desenvolvido no módulo 01, por isso tentei fazer algo diferente e mais performático. Para tanto, tentei evitar o uso do array `tasks` que armazena todos os dados do banco em memória, o que vai de encontro com as vantagens de usar Streams.

Minha primeira ideia foi utilizar `async generators` com `createReadStream` e `createWriteStream`. Apesar de ter conseguido algo, aparentemente essa técnica também nega as vantagens de streams. Não tenho certeza no entanto.

Daí, tentei utilizar os novos e experimentais *readable streams ES6 array-like methods*. Isso aí nem consegui escrever uma linha, já que a documentação é uma porcaria (ou eu sou burro).

Por fim, me rendi ao uso de um *array* e implementei o CRUD.

### Built with

- Node.js
- csv-parser

### What I learned

1. There is no need to wrap some code in `try/catch` block if the code contains a callback that already handles errors.

2. Either the Node.js API docs is really bad or I am dumb as fuck. I simply couldn’t write a line of code by reading the docs. Furthermore, the sync/async/promises/callback variants made my head ache!

3. `decodeURIComponent` to convert from URI string to actual text (remove those %%%).

4. A bit of Node.js Streams

5. A bit of Node.js `fs` module practice

6. Use `csv-parse` library to read CSV lines as JSON objects

7. It seems that `if (!task || typeof task !== "object" || Array.isArray(task))` is a good way to check whether the variable is an actual object `{}` or not.

### Questions

1. If `for await chunk of req` loops through all the `req` object, why does `JSON.parse(Buffer.concat(buffer).toString()` returns exactly the `body`, excluding the rest of the `req` data?

2. Does `async generators` negate the advantages of using Streams? I mean, I could `yield` data from a readable stream to `res` object, but I don’t know whether it’s done in chunks or not.

### Continued development

The Database class has an array that contains all the `db.json` data, which negates the “chunk by chunk” and “low memory usage” of Streams. I tried to build the API without using this array, but I did’t succeeded.

### Useful resources

- [Mockaroo](https://mockaroo.com/) - I used this tool to generate fake CSV data.

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)
