# Módulo 01 - Fundamentos do Node.js

O primeiro módulo da trilha atualizada de Node.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) ensina como desenvolver uma API RESTful focada nos fundamentos da tecnologia, sem *frameworks* ou bibliotecas externas. Os conceitos abordados no projeto implementado são: módulos internos do Node.js como `HTTP`, `Crypto` e `File System`; fundamentos HTTP como `requests`, `respondes`, `headers`, `status code`, `route` e `query` parameters. Além disso, Streams são apresentadas em profundidade bem como aplicá-las para realizar operações assíncronas e parciais no *backend*.

## Table of contents

- [Overview](#overview)
  - [Getting started](#getting-started)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Questions](#questions)
- [Author](#author)

## Overview

O projeto é uma API Restful para CRUD de usuários (nome e email) em um banco de dados (arquivo JSON). Para a construção do *backend*, *middlewares*, *streams*, *routes*, *http* e *fs* são utilizados.

### Getting started

Clone o repositório para sua máquina, acesse o diretório e execute `npm run dev` para iniciar o servidor. Utilize algum cliente HTTP para realizar as requisições (GET, POST, PUT, DELETE). Eu utilizo o Thunder Client - extensão do VS Code.

## My process

Ao fim de cada aula, escrevi por mim mesmo o código que foi apresentado, evitando ao máximo espiar a fonte e pesquisando conceitos cuja a explicação não foi suficiente para meu gosto.

### Built with

- Node.js

### What I learned

- Iniciar um servidor Node.js é simples: crie um diretório, inicie um projeto com `npm init --yes` e faça uso do módulo *http*.

- Node.js versão 18 agora possui um modo `--watch` nativo. Antigamente, eu utilizava *nodemon* para *hot restart* do servidor.

- O que são, para que servem e como utilizar *middlewares*.

- O que são, para que servem e como criar *streams* e *buffers*.

- Como criar uma função para roteamento, incluindo extração de *slugs* e *query parameters*.

- Como extrair partes da URL utilizando regex.

- Como criar um banco de dados simples (arquivo JSON) e uma interface de acesso (classe) utilizando o módulo *fs*.

- `http.writeHead` *status codes*.

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)
