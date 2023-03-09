# Projeto 03 - Consumo de APIs e performance no ReactJS

O terceiro módulo da trilha atualizada de ReactJS do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) ensina como construir uma aplicação web cujos dados são servidos através de uma API e como os algoritmos de renderização do React funcionam.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screencast](#screencast)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

Neste módulo, o aplicativo desenvolvido se chama DT Money, um app para controle financeiro em que o usuário pode inserir transações e visualizar informações sobre elas.

### The challenge

O desafio deste módulo é construir uma aplicação web capaz de realizar requisições HTTP para um backend, que armazena e fornece os dados, utilizando as melhores práticas de ReactJS. Além disso, aplicar alguns hooks para melhorar a performance da aplicação.

#### Design

- ✔️ Aplicação correta de fontes, cores, tamanhos, espaçamentos, ilustrações, ícones e textos;
- ✔️ Reação de botões e campos a ações de *hover over*, *focus* e *disabled*;
- ✔️ Responsividade entre 320px e 1440px (diferencial).
  - ✔️ Em dispositivos móveis, o dashboard ser um slider
  - ✔️ A tabela de transações deve se adaptar perfeitamente a cada dispositivo
  - ✔️ Textos e espaçamentos fluidos.

#### Funcionalidades

- ✔️ O dashboard deve apresentar um resumo dos totais de entradas e saídas das transações cadastradas pelo usuário.
- ✔️ A tabela deve apresentar todas as transações cadastradas armazenadas no backend.
- ✔️ A tabela deve conter paginação (diferencial).
- ✔️ A tabela deve conter um campo para filtragem de transações.
- ✔️ O aplicativo deve fornecer um modal dialog com um formulário para cadastro de transações.

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Live Preview](https://dt-money-jvmdo.netlify.app/)

- [Repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/reactjs/dt-money)

## My process

### Built with

- Vite
- Mobile-first workflow
- Semantic HTML5 markup
- CSS custom properties
- ReactJS
- TypeScript
- Styled Components
- Radix-UI
- Keen Slider
- react-responsive
- react-hook-form
- zod
- json-server
- axios

### What I learned

- How to make a simple table pagination

- Use CSS custom properties with styled components is a good practice

- Setup a fake but real backend with json-server

- Axios to make HTTP requests

- `useContextSelector(context, (context) => context.DesiredVariable)` is a useful function to avoid unnecessary rendering in React. It selects only the variable or function components that need to be updated. However, keep in mind that `MyContextProvider` is recreated every time one of its state variables is updated. This can cause all of its functions to be re-rendered, leading to unnecessary rendering.

- The `useCallback(callback, [])` hook prevents functions from being recreated if the data they use hasn't changed. This data is passed in the hook's dependency array.

- `memo()` is used to prevent React from running a new rendering flow for a component. However, it comes at a processing cost, so it must be used carefully. In some cases, when the component is not too large or doesn't hold complex data structures, the cost of rendering is less expensive than the calculation cost of `memo`.

- The `useMeme(() => {...}, [])` hook serves the same purpose as `memo`, but for variables and data structures. The variables are recreated only when the hook’s dependency array is changed.

### Questions

- I have two base URL: one for local development, another for production environment. Can I choose the base url based on current environment?

### Useful resources

- [Table pagination tutorial](https://dev.to/franciscomendes10866/how-to-create-a-table-with-pagination-in-react-4lpd)

- [Styled components best practices by Robin Wieruch](https://www.robinwieruch.de/styled-components/)

- [Styled components best practices by Josh Comeau](https://www.joshwcomeau.com/css/styled-components/)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)
