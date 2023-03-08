# Desafio 03 - GitHub Blog

O terceiro desafio da trilha atualizada de ReactJS do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) exige que o aluno desenvolva uma aplicação frontend aplicando capaz realizar requisições HTTP para popular o conteúdo das páginas.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screencast](#screencast)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Questions](#questions)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

GitHub Blog é um web app que serve como um blog para as *issues* de um repositório de um único usuário. Na página inicial, informações do usuário e um resumo de cada *issue* do repositório são apresentados. É possível digitar em um campo de entrada para filtrar issues por nome. Ao clicar em um resumo, o app redireciona para uma página que mostra todo o conteúdo da *issue*.

O layout/design da aplicação está disponível [nesse projeto Figma](https://www.figma.com/community/file/1138814951106121051).

### The challenge

O ponto principal desse desafio é utilizar APIs do GitHub para recuperar informações de do único usuário e as *issues* de um dos seus repositórios. Para tanto, o app faz requisições a Users API, Search API e Issues API para construir os componentes de acordo com os dados retornados.

#### Design

- ✔️ Aplicação correta de fontes, cores, tamanhos, espaçamentos, ilustrações, ícones e textos;
- ✔️ Reação de links a *hover over* e *focus*;
- ✔️ Formatação e estilização de markdown;
- ✔️ Responsividade entre 320px e 1440px (diferencial).
  - ✔️ Textos e espaçamentos fluidos;
  - ✔️ A grade de cards segue um layout tipo masonry.

#### Funcionalidades

- ✔️ A página inicial deve apresentar informações do usuário obtidas pela Users API.
- ✔️ A página inicial deve apresentar uma grade de *cards*, cujo conteúdo é um resumo das *issues* obtidas pela Search API.
- ✔️ A página inicial deve fornecer um campo de entrada de texto pelo qual é possível filtrar *issues* utilizando a Search API.
- ✔️ A página da *issue* deve apresentar informações da *issue* em questão bem como o seu conteúdo formatado em markdown.

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Live preview](https://github-blog-jvmdo.netlify.app/)

- [Remote repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/reactjs/github-blog)

## My process

- **Configuração**
  - Iniciei o projeto
  - Configurei ESLint
  - Instalei e configurei styled-components
  - Escrevi o styled theme e CSS global
- **Interface**
  - Implementei o Header
  - Implementei a Home e seus componentes
  - Implementei a Post e seus componentes
- **Navegação**
  - Implementei o layout padrão
  - Configurei as rotas da aplicação
  - Implementei a navegação entre páginas
- **Funcionalidade**
  - Configurei o axios
  - Implementei os métodos de requisição aos endpoints das APIs
  - Fiz a chamada desses métodos nos componentes

### Built with

Some of the technologies, libraries, tools, techniques, patterns, and concepts applied in this project.

#### Technologies, libraries and tools

- Vite
- ReactJS
- TypeScript
- styled-components
- react-hook-form
- react-router-dom
- react-markdown
- axios
- phosphor-react
- date-fns
- ESLint

#### Techniques and more

- Mobile-first workflow
- Semantic HTML5 markup
- Columns for masonry-like layout
- styled-component theme
- react-router layouts
- Fluid text and spacing

### What I learned

- Freeze the theme object (with `as const` or `Object.freeze()`) makes TypeScript understand that each key has one single possible value (which is displayed while autocomplete).

- I weren't able to make TypeScrip's `HTMLElementTagNameMap` work, so I defined my own for few tags only. This way, I could add a property `tag?: keyof HTMLElementTagNameMap` to my `FluidText` component so it renders as the passed tag (headings, paragraph or span).

- I created a custom `<LinkIcon>` component which should be able to accept all the regular `<a>` attributes plus the ones I defined. It turned out that neither `HTMLProps<HTMLAnchorElement>` nor `HTMLAttributes<HTMLAnchorElement>` worked. That's how I got to `ComponentPropsWithoutRef<'a'>`.

  > `ComponentPropsWithoutRef` is a utility type that is included in the @types/react
  package. It's used to create a new type that includes all of the props for a React component, except for the ref
  prop.

- During this challenge, I took the react-router-dom tutorial and I realize its use is simpler than I thought.

- I used to put layout components together with other general components in src/components. I realized Header is actually a *Layout component*. It makes sense it should be at src/layouts/components/.

- Fetching data in `useEffect()` instead of in an event handler as state in the official documentation.

- Making the API requests within an `useEffect()` hook, the page needs to request data on every first render including simple go forward/back navigation. According to the documentation, it not that simple workaround this behavior. I am better using a framework for that.

### Questions

| Question 01 |
|    :---:    |
| How does the state update queue goes when the values are queued from asynchronous functions? |
---

**Answer**: Execution sequence when state update is invoked within an asynchronous function. The sequence for the snippet below is:

  ```tsx
  useEffect(() => {
      async function getCardData() {
        setIsLoading(true)
        const data = await getIssueCardData(query)
        if (data) {
          setCardData(data)
          setIsLoading(false)
        }
      }
      getCardData()
    }, [query])
  ```

  1. `getCardData()` is called;
  2. `setIsLoading()` puts the value `true` in the update queue.
  3. The `await` keyword makes the function execution stop at that line until the computation of `getIssueCardData()` is resolved. Therefore, JavaScript engine puts `getCardData()` in the callback queue.
  4. The rest of the synchronous code is ran, that means a new render occurs and `isLoading` now is `true`.
  5. As soon as the async computation is terminated, the code execution go back to `getCardData()` and next lines are executed. This way, considering the if statement is valid, the `cardData` is set as well as the `isLoading`. A new re-render is executed which is makes `isLoading` = `false`.

| Question 02 |
|    :---:    |
| Why did react-markdown not work properly? It styled bold text but not italic (I tried both * and _). I had to manually style the headings and links :/ |
---

**No answer yet**.
  
### Continued development

There are 3 thing I want to improve in this project:

  1. Routes with data
  2. Visual feedback when data is being fetched
  3. Visual feedback when fetch goes wrong

My approach will be:

  1. Use the new Data API from react-router v6.4, which binds the routes and the data its consumes.
  2. Use MUI's Skeleton component.
  3. Use MUI's Snackbar + Toast or Alert components.

However, I am not sure what's the better way to handle request errors yet.

### Useful resources

- [How to extend any HTML element with React and TypeScript](https://dev.to/jbrocher/how-to-extend-any-html-element-with-react-and-typescript-2f97)

- [You might not need an effect - Fetching data](https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data)

- [MUI Skeleton](https://mui.com/material-ui/react-skeleton/)

- [MUI Toast](https://mui.com/material-ui/react-alert/#toast)

- [MUI Alert](https://mui.com/material-ui/react-alert/)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)
