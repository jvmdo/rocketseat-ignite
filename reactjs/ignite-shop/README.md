# Projeto 04 - Fundamentos de Next.js

O quarto projeto da trilha atualizada de React.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) ensina como desenvolver um pequeno e-commerce utilizando o *framework* Next.js.

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

Ignite Shop é uma loja virtual para venda de camisas da Rocketseat. O website é renderizado no servidor utilizando as funcionalidades do Next.js; é estilizado com a biblioteca Stitches e utiliza o serviço de pagamentos online Stripe. Todo o catálogo da loja é apresentado em um slider, em que o usuário pode selecionar uma camisa para visualizar detalhes e comprar uma unidade.

O *layout/design* da aplicação está disponível [nesse projeto Figma](https://www.figma.com/file/OIJJEW24DFiJO6XLqHw2DM/Ignite-Shop/duplicate).

### The challenge

O ponto principal do projeto é aprender como as funcionalidades de SSR e SSG do Next.js funcionam, quando utilizá-las e como elas melhoram a performance da aplicação. O projeto também ensina outras características do *framework*, como rotas, *layouts*,  otimização de imagens, *serverless functions* e SEO.

#### Design

- ✔️ Aplicação correta de fontes, cores, tamanhos, espaçamentos, ilustrações, ícones e textos;
- ✔️ Reação de botões a *hover over*, *focus* e *disabled*;
- ✔️ Responsividade entre 320px e 4k em ambas orientações (bônus)
  - Textos e espaçamentos fluidos;
  - Slider vertical e horizontal.

#### Funcionalidades

- ✔️ A página inicial apresenta os produtos em um *slider*, em que cada produto tem um *tooltip* com nome e preço do produto mostrado ao *hover over*;
- ✔️ Clicar em um produto leva o usuário a uma tela com mais detalhes e um botão de compra;
- ✔️ Clicar no botão de compra leva o usuário à tela de pagamento do Stripe;
- ✔️ Pagamento bem-sucedido deve retornar ao app e apresentar a tela de sucesso.

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Live preview](https://ignite-shop-jvmdo.netlify.app/)

- [Remote repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/reactjs/ignite-shop)

## My process

Inicialmente, assisti a todas as aulas do módulo, tomando notas para os pontos importantes. Após finalizar, parti para a prática.

Primeiramente, iniciei um projeto Next.js e criei a base da aplicação (páginas e rotas). Em seguida, implementei o esqueleto do *layout* da aplicação em *plain* HTML/CSS.

Com o *layout* pronto, implementei os componentes e os estilizei com Stitches. Assim, pude montar todas as telas em React.js e completar a interface da aplicação.

Por conseguinte, fiz uso das funcionalidades de *pre-rendering* do Next.js, começando com SSR e refatorando para SSG as telas que melhores se adequaram ao padrão. Paralelo a isso, fiz a integração da aplicação com o Stripe.

Por fim, fiz um mínimo de SEO para cada página.

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

#### Techniques and others

- Mobile-first workflow
- Semantic HTML5 markup
- Flexbox / Grid
- Fluid typography using Stitches' utils
- Responsive slider using only CSS
- Container queries

### What I learned

- [The foundations of SRR with Next.js](./Next.md)

- [The foundations of Stitches](./Stitches.md)

- What is Stripe and how to use its Stripe.js SDK

- How to implement a slider using CSS's `scroll-snap` properties and how to control using JS

- How to detect touch devices using only CSS

- `vmin` and `vmax` are the best units for defining sizes and spacing that depends on device orientation

- Container queries are real. I applied `cqh` unit to size the slider items. Unfortunately, I could not make it work to size the item's tooltip ☹

- HTMLAttributes vs HTMLProps vs {Specific}HTMLAttributes

  `HTMLAttributes` é uma interface que define os atributos comuns a todos os elementos HTML, como `className`, `id`, `style`, etc. `HTMLProps` é uma interface que estende `HTMLAttributes` e adiciona alguns atributos extras do React que são específicos para cada tipo de elemento HTML, como `ref`, `key`, etc.

  Por exemplo, se você quiser criar um componente de botão que aceita todos os atributos de um elemento `<button>`, você pode usar `HTMLProps<HTMLButtonElement>` como o tipo das props do seu componente. Isso vai garantir que você possa passar atributos como `type`, `disabled`, `onClick`, etc. para o seu componente de botão.

  ```tsx
  interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    // Custom properties
  }

  export function Button(props: ButtonProps) {
    return <button {...props} />;
  }

  // Instantiating
  <Button type="button" onClick={() => alert("Olá!")}>
    Clique aqui
  </Button>
  ```

  Se você usar `HTMLAttributes<HTMLButtonElement>` em vez de `HTMLProps<HTMLButtonElement>`, você vai perder os atributos `ref` e `key`, que são importantes para o React gerenciar os elementos do DOM e as listas de componentes.

  Portanto, a recomendação é usar HTMLProps quando você quiser criar um componente personalizado que aceita todos os atributos de um elemento HTML específico.

  **Onde entram os {Specific}HTMLAttributes?**

  No exemplo anterior, deve-se atentar que o component `<Button>` retorna um elemento HTML padrão. Caso o seu componente retorne um `styled component`, então não use `HTMLProps<T>`, pois um erro e *overload* será gerado ao tentar passar as props. Nesses casos, eu utilizo `ButtonHTMLAttributes`, `AnchorHTMLAttributes`, `InputHTMLAttributes`, etc., que são interfaces específicas de cada elemento, oferecendo seus atributos HTML corretamente sem gerar erros. Os demais atributos específicos do React já vêm embutidos no styled component.

### Questions

- How to type an `utils` that accepts an object as parameter? I tried to use what the docs advise but it seems it works only for single values.

- Why does a TypeScript error is raised when I apply the `fluidFontSize` utils in the top level of a style object? No error occurs in nested objects tho.

  > Type 'string' is not assignable to type 'number | { readonly [$$ScaleValue]: "fontSizes"; }'.ts(2322)

- Is it possible to prevent the slider from restoring its scroll position on page navigation?

  > It may be possible to achieve this by programmatically controlling the snap container's scroll behavior based on its scroll values and the offsetWidth/offsetHeight of its children.

- Is it possible to prevent `container` property from creating the same context as `position: relative`? Because of that, I could not make the `GradientArrow` span the entire screen height.

### Continued Development

Although my slider is cool, it isn't that accessible. So, I am better off using Keen Slider, with the following instructions:

1. In order to use a fixed width slide item:

    `slides: { perView: "auto", spacing: 32 }`

    Item width must be set inline (`style = {}`) using `min-width|max-width`, not `width` property.

2. In order to left align the first and (almost) center the last:

    ```js
    range: { max: slider.length - 2 }
    slides: { origin: 0 }
    ```

    However, it depends on the slide width

### Useful resources

- [Detect touch devices with CSS](https://ferie.medium.com/detect-a-touch-device-with-only-css-9f8e30fa1134)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)
