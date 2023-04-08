# Desafio 04 - Fundamentos de Next.js

O quarto desafio da trilha atualizada de React.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) visa testar a compreensão do aluno em SSR com Next.js, propondo a adição de recursos ao web app Ignite Shop desenvolvido no projeto deste mesmo módulo.

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

Ignite Shop 2.0 é uma loja virtual para venda de camisas da Rocketseat. O website é renderizado no servidor utilizando as funcionalidades do Next.js; é estilizado com a biblioteca Stitches e utiliza o serviço de pagamentos online Stripe. Todo o catálogo da loja é apresentado em um slider, em que cada item possui seu botão de adicionar ao carrinho. O usuário também pode selecionar uma camisa para visualizar detalhes e adicionar uma unidade ao carrinho. No carrinho, é possível incrementar/decrementar itens e ir para o serviço de pagamento.

O *layout/design* da aplicação está disponível [nesse projeto Figma](https://www.figma.com/file/FxlDRKOmznBbTH8DsTgnZU/Ignite-Shop-2.0/duplicate).

### The challenge

O ponto principal do projeto é adicionar a funcionalidade de carrinho ao Ignite Shop desenvolvido no projeto deste módulo, o que envolve gerenciamento de estado, persistência de dados e alterações na interface. O processo de checkout é disparado por um botão presente no carrinho, que é um *swipeable drawer* à direita.

#### Design

- ✔️ Aplicação correta de fontes, cores, tamanhos, espaçamentos, ilustrações, ícones e textos;
- ✔️ Reação de botões a *hover over*, *focus* e *disabled*;
- ✔️ Carrinho em swipeable drawer
- ✔️ Responsividade entre 320px e 4k em ambas orientações (bônus)
  - Textos e espaçamentos fluidos;
  - Slider vertical e horizontal.

#### Funcionalidades

- ✔️ A página inicial apresenta os produtos em um *slider*, em que cada produto tem um *tooltip* com nome e preço do produto mostrado ao *hover over* e um botão para adicionar/remover o item do carrinho;
- ✔️ Clicar em um produto leva o usuário a uma tela com mais detalhes e um botão de compra, onde há outro botão para adicionar/remover o item do carrinho;
- ✔️ Incrementar/decrementar itens que estão no carrinho.
- ✔️ Pagamento bem-sucedido deve retornar ao app e apresentar a tela de sucesso.

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Live preview](https://ignite-shop-2-jvmdo.netlify.app/)

- [Remote repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/reactjs/ignite-shop-2.0)

## My process

Iniciei ao clonar meu projeto do Ignite Shop e fiz as devidas configurações. Em seguida, implementei as alterações da interface mais importantes. Por fim, fiz uso do `use-shopping-cart` para gerenciar o estado do carrinho e adicionar funcionalidades ao botões.

### Built with

Some of the technologies, libraries, tools, techniques, patterns, and concepts applied in this project.

#### Technologies, libraries and tools

- Next.js
- React.js
- TypeScript
- Stitches
- Stripe.js SDK
- react-responsive
- axios
- Material UI
- use-shopping-cart

#### Techniques and others

- Mobile-first workflow
- Semantic HTML5 markup
- Flexbox / Grid
- Fluid typography using Stitches' utils
- Responsive slider using only CSS
- Container queries
- Icons with phosphor-react

### What I learned

- Focused libraries as `use-shopping-cart` are very useful

- How to create a custom hook based on another

- Stitches' variants are awesome! I did forget to use them in the last project

- Stitches > Styled Components ? Joy UI > Material UI ?

- How to target and change styles of a MUI's component

- Always build the app to make sure everything works in prod. It happened that `clearCart()` wasn't working in prod although it was alright in dev. More below.

### Questions

1. `use-shopping-cart`'s `formatLineItems()` seems very useful. Unfortunately, there is a bug in its import.

2. I encountered an issue where the cart items were getting lost during navigation. After seeking advice from ChatGPT, it suggested some potential causes for the problem:

    > If you're using `<Link/>` from Next.js, it may be causing the cart items to be lost when you navigate. This is because `<Link/>` performs client-side navigation and does not rehydrate the shopping cart state that was previously saved in the server-side rendering.

    It does seem plausible that the issue could be related to hydration failure during the initial app render in Next.js, which is the error message being displayed. However, I'm not entirely certain. I had assumed that the context provided by `<CartProvider/>` would be enough to maintain the state between navigations, similar to how the `<FormProvider/>` from the react-hook-form library works.

    **SOLUTION.** I set `<CartProvider shouldPersist={true}/>`, which turns `localStorage` on.

3. The following code snippet is intended to clear out the user's cart when they leave the Success page. While this functionality works as expected when using the development server, it fails to work properly in production after running the `npm run build` command.

    ```jsx
    useEffect(() => {
        const handleRouteChange = () => {
            // The message is logged but the method does not run
            // Both localStorage and cart state remain untouched
            console.log("Did run?")
            clearCart()
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router, clearCart])
    ```

    **SOLUTION**. I decided to clear out the cart as soon as the Success page is rendered:

    ```jsx
    const { clearCart } = useCart()
    const clearCartRef = useRef(clearCart)

    useEffect(() => {
        clearCartRef.current()
    }, [])
    ```

    **ANSWER?** I asked Bing Chat, it answered:

    > The problem is related to how Next.js handles server-side rendering and hydration. When a page is rendered by `getServerSideProps`, Next.js sends the HTML and JSON data to the browser, and then hydrates the page with React on the client side. This means that the `useEffect` hook runs twice: once on the server and once on the client. However, `use-shopping-cart` uses `localStorage` to store the cart state, which is only available on the client side. Therefore, when `clearCart` runs on the server, it does nothing, because there is no `localStorage` to access. When it runs on the client, it clears the localStorage, but it does not update the cart state in React, because `use-shopping-cart` uses a custom reducer that only updates when an action is dispatched.

    It also mentioned that change SSG to SSR resolves the issue:

    > You can change the Home page to use `getServerSideProps` instead of `getStaticProps`, so that it is also pre-rendered on the server for each request. This way, you will trigger a route change on the client side when you click on the link, and the `useEffect` hook on the Success page will run as expected.

    That's correct since everything works when running in dev mode (there is no SSG in dev, only SSR).

    *I am not sure what's the actual cause yet*.

### Continued Development

Learn more about the differences between SSG and SSR rendering regarding to hydration, states and routing.

### Useful resources

- [Detect touch devices with CSS](https://ferie.medium.com/detect-a-touch-device-with-only-css-9f8e30fa1134)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)
