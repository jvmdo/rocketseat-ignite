# Desafio 06 - BookWise

O sexto e último desafio da trilha atualizada de React.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) visa testar a compreensão do aluno no desenvolvimento de uma aplicação *fullstack* utilizando o *framework* Next.js.

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

BookWise é um aplicativo web para escrita e leitura de avaliações de livros dos mais diversos gêneros. O usuário pode ler as avaliações mais recentes na página Home ou filtrar por livro na página Explorer. Para escrever, o usuário deve conectar-se com alguns dos métodos de autenticação fornecidos pela aplicação. Na página Profile, são apresentadas avaliações e estatísticas do usuário.

O *design* da aplicação está disponível [nesse projeto Figma](https://www.figma.com/file/jTau6bMNSF10GkqwYAbuLA/BookWise/duplicate).

### The challenge

O desafio propõe desenvolver um projeto *fullstack* completo, do zero à implantação, utilizando Next.js, Next Auth com provedores OAuth (Google e GitHub), Prisma, PlanetScale, Vercel dentre outros serviços, tecnologias e ferramentas.

#### Design

- ✔️ Aplicação correta de fontes, cores, tamanhos, espaçamentos, ilustrações, ícones, textos e imagens;
- ✔️ Reação de botões e links a *hover over*, *focus* e *disabled*;
- ✔️ Responsividade entre 320px e 4k em ambas orientações (bônus)
  - Texto e espaçamento responsivos;
  - Barra de navegação é um *collapsible* em dispositivos menores.
  - Seção de livros populares é um *carrousel* em dispositivos menores.

#### Funcionalidades

- ✔️ A página inicial oferece 3 maneiras de acesso: Google, GitHub ou visitante;
- ✔️ Home é renderizada com SSG, apresenta os livros populares e as avaliações mais recentes¹ e também a última leitura de usuários autenticados;
- ✔️ Explorer é renderizada com SSG e apresenta a galeria¹ de livros com opções de filtros por *chips* ou texto.
- ✔️ Profile é renderizada com SSR e apresenta as avaliações e estatísticas de um usuário.
- ✔️ Ao clicar em *cards* de livros em qualquer página, um *drawer* é aberto, apresentando detalhes do livro e todas suas avaliações.
- ✔️ No *drawer*, um usuário autenticado pode escrever sua avaliação. O formulário é devidamente validado.

  ¹ Os dados são retornados como *fallback* para o SWR e revalidados, mantendo-se sempre atualizados enquanto o usuário utiliza a aplicação. Mutações optimísticas são utilizadas onde necessárias.

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Remote repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/reactjs/bookwise)

- [Live preview](https://bookwise-jvmdo.vercel.app/)

## My process

Inicialmente, abordei o desafio com perguntas de projeto para cada componente e tela do *design*. Fiz anotações e escrevi um plano de desenvolvimento: configuração, implementação dos *endpoints*, implementação dos componentes isoladamente com Storybook, construção das páginas e adição das funcionalidades e *fetching* de dados.

Os *endpoints* seguem alguns conceitos de Backend for Frontend, em que cada um deles é especializado em fornecer comunicação e dados exclusivos para um componente ou tela.

Os *stories* foram utilizados com a finalidade de desenvolvimento, sem foco na parte de documentação e testes.

Após a integração das partes, SWR foi essencial para realizar o *fetching* e *caching* de dados de maneira eficiente.

### Built with

#### Technologies, libraries and tools

- React.js
- Next.js
- TypeScript
- Storybook
- Next Auth
- Prisma
- Stitches
- Radix UI
- SWR
- axios
- day.js
- date-fns
- react-simple-star-rating
- Phosphor Icons
- React Hook Form
- Zod
- Next SEO

#### Techniques, concepts and more

- Mobile-first workflow
- Semantic HTML5 markup
- Flexbox / Grid
- Container queries (units)
- Some Mantine hooks
- Backend for Frontend with Next.js API Routes
- Docker (local MySQL database hosting)
- PlanetScale
- Vercel

### What I learned

1. It took me 5 months to find out why `.prettierignore` doesn’t work in my projects. Since I am using subdirectories, the file must be placed in the root instead of in each project.

2. Storybook doesn’t know where to import `tsconfig.json` from, which leads to `can't resolve path` error. To fix this issue, I added the `webpackFinal` code in the `main.ts` file.

3. [Basics RESTful API conventions](#the-big-brainz-theory)

4. `type-fest` package to convert object properties from `snake_case` to `camelCase`.

5. Switch statement to check request method within endpoints code

6. `useEffect` vs *event handlers* in React. The most basic way to choose one or another is to figure out if something must happen because of user interaction or component re-render.

7. HTTP POST vs PUT. I had to choose which one better suits the “create or update” resources.

8. An variable whose value is `undefined` will be ignored by Prisma. Keep in mind that use such a variable as query for non-nullable fields (for example, id) will cause an error.
    1. Actually, it depends on the method. If you query `findMany` where filter is `undefined`, all objects will be returned because [there is no filter at all](https://github.com/prisma/prisma/issues/9124).

9. In JavaScript, the `switch (true)` pattern allows the author to make value comparisons in each `case` clause.

10. The Auth.js adapter for Prisma expects the User, Account and Session models to fit the structure presented on docs. In case the a different structure is needed, you must implement your own adapter.

11. `OAuthAccountNotLinked`. Auth.js does not link different accounts with the same email from OAuth providers because of [security issues](https://github.com/nextauthjs/next-auth/issues/519#issuecomment-696673600). However, in case you want to ignore the default, set `allowDangerousEmailAccountLinking` to true in the provider configuration.

12. How to set session cookies in Thunder client to make an authenticated request. Copy the cookie value from browser then set it like `next-auth.session-token=<value>; HttpOnly;`. Clearing for subsequent requests is as simple as pass an empty value `next-auth.csrf-token=`

13. How to pass Phosphor Icon as prop using `icon: ElementType<IconProps>`

14. How to use icons sprite in Next.js. The pulo do gato is to pass the URL relative to `public` instead of import: `<use xlinkHref="/icons.svg#rocket"></use>`

15. How to implement a Stitches’ `utils` named `responsiveFontSize` with autocomplete. I could make the `fluidFontSize` version as well, however I have to manually define the types for the autocomplete to work.

16. The new `color-mix` CSS property is ideal for adding transparency to colors: `color-mix(in srgb, $purple100 6%, transparent)` is the same as `$purple100-0f`.

17. ~~Combine `grid` implicit height with `container` is a nice approach to avoid `height: 100%`~~

18. How to implement a simple SVG animation using CSS only

19. How to implement a nice mobile-first responsive sidebar combining Radix UI’ Collapsible and NavigationMenu

20. Next.js' `<Link>` component does not have an `active` class built-in. [Therefore, we need to implement it ourselves](https://www.slingacademy.com/article/how-to-highlight-currently-active-link-in-next-js/). Fortunately, Radix UI's `NavigationMenu` provides a convenient solution to achieve this.

21. Style scrollbar isn’t that complicated [(at least for webkit-based browsers)](https://stackoverflow.com/a/72182365/21858786).

22. Naming components can be challenging! I find myself frequently renaming them. At one point, I encountered a situation where a component was rendering itself, resulting in an infinite loop. It took me a while to locate and fix the bug.

23. Remember: you must set `flex-basis` otherwise `row wrap` won’t work (in case you have set `flex: 1` shorthand).

24. It seems that best way to use CSS variables in pseudo-elements’ `content` is the `counter()` way.

25. If you set `container: name / type` where `type` is `size` for containers that do not have explicitly defined `height`, the container will vertically shirk to its padding (or completely disappear if no padding). To address this, you can set the `type` as `inline-size` to ensure the container behaves as expected.

    Oh Shit! The container (with `type: size` and `min-height`) will not stretch to fit its child height, i.e, no scroll. You would have to apply `overflow` in container, which is bad since Next.js `<Link/>` has scroll issues when the body is not the scrollable container

26. Neat trick to center positioned elements: `inset: 0` + `margin: auto`. It works under one condition: both `width` and `height` must be set (`min-content` functions!)

27. By using **`animation-fill-mode: forwards`**, the element will stay in its final state, as defined by the last `keyframe`, even after the animation ends. This can be useful for maintaining the end state of an animation or for creating persistent visual effects.

28. Keep in mind: when clamping text, it's important to apply the **`overflow`**, **`text-overflow`**, **`white-space`**, and **`-webkit`** properties directly to the text element itself, rather than its container.

29. The `LinkWrapper` border was not matching its child border radius. I changed `border` for `box-shadow: 0 0 0 2px $color` to address the issue.

30. How to dynamically trim DOM `textContent` using the `ResizeObserver` API

31. When placing the `<BookDrawer/>` in the layout, I had problems with its placement: `fixed` did not work. I found that its `overlay` was taking up the space and pushing `content` out of the viewport. Solution: keep `fixed` and nest `content` inside `overlay`.

32. When using **`width: 100%`** for positioned elements, the child element may overflow its parent if the parent has padding applied. On the other hand, **`inset-inline: 0`** will make the child element fill the entire width, but it will disregard the padding of its parent.

33. Elementos absolutamente posicionados respeitam as bordas do seu *containing block.* Usar bordas invisíveis como *padding* evitam o problema do *padding* do absoluto.

34. By combining **`position: absolute`** with **`insetInline|Block: 0`**, you can effectively ignore the parent's paddings. However, it's important to note that using this approach will take the child element out of the normal flow.

35. The order of media queries in CSS does matter. If two media queries have the same specificity and both apply to the same element, the one that comes last in the CSS file will take precedence.

36. This one you won’t find in any documentation: `next.config.ts` `pageExtensions` affects `middleware.ts`. You must rename the middleware file to `.page` or `.api` as [pointed out in this answer](https://stackoverflow.com/a/74924994/21858786).

37. `pageExtensions` strikes back! For your root page, you must export rendering functions from the root file, not from the one you actually implement the page.

38. The `baseURL` set in `axios.create()` must be the full URL otherwise it won’t work API routes invoked on server side rendering methods.

    Well, you are better off not invoking API routes on these methods. `baseURL` as `/api` should work fine.

39. react-responsive’s `<MediaQuery/>` component introduces hydration problems in SSR. It offers ways to prevent the problems, but I went to @ `@mantine/hooks` as alternative.

40. React Context [triggers re-render for all components calling `useContext`](https://stackoverflow.com/a/60589786/21858786) for that specific Provider on every context `value` change. I assume this behavior is different for `useContextSelector`

41. How to format query params using `URLSearchParams()`

42. How to cherry-pick props from Stitches components: `export interface CardProps
  extends Pick<ComponentProps<typeof S_Card>, 'size' | 'color'>`

43. `ex` unit is pretty useful

44. Durante uma refatoração do componente `ReviewForm`, aprendi que o *callback* de erro do HookForm é invocado caso algum dos *default values* não respeite o Schema.

45. `ReactElement` → Single child while `ReactNode` → multiple children

46. SWR pre-render with fallback data is really nice feature. Just make sure the `fallback` property passed to `SRWConfig` is an object whose format is: `{key: fallbackData}`.

47. There is no need to call API Routes endpoints in server-side rendering methods. As the method runs on server, it possible to retrieve data directly from Prisma. I implemented fetch functions that is used for both rendering methods and API routes.

48. How to start the Next.js server on local network: `npm run dev -- -H {IP}`

49. Axios `baseURL` was raising SWR fetching errors when accessing the site via local network. Of course, `[localhost](http://localhost)` is not the same as `192.168.15.143`.

50. `Element.classList.toggle` accepts a second argument that decides whether the toggle behaves as `.add` or `.remove`.

51. Apply hero height `100vh` is actually more appropriate than `100dvh` when the grid height depends on hero height. Otherwise, the content would be clipped behind the URL bar on mobile devices.

52. Radix UI’s `<ScrollArea/>` is a good option to change scrollbar appearance across browsers. It working by wrapping the `page` in `_app.tsx`. However, it will brake the `<Link/>` scroll navigation.

53. Before deployment, I should build the app using the deploy `.env` keys and test it locally. It would save me some unnecessary rebuilds on Vercel.

54. Prisma Studio also works for remote databases!

### Questions

1. Redundant endpoints? I have to include almost the same information in each of them because the book drawer needs book data.

2. Is my `Shelf` model conceptually wrong? I defined it in order to figure out which books the user already read and when was his/her last read. Although it works on its purpose, something tells me it’s wrong in terms of database modeling.

    Or maybe “shelf” is not a good name, which makes me think in the wrong way.

3. Change the camel cased columns to its snake case equivalent in the provided User, Account and Session models by Auth.js breaks the adapter operations. Why does `providerAccountId String @map("provider_account_id")` work but `provider_account_id String` don’t?

4. How to implement *art direction* for Next.js `<Image/>`? According to this [unanswered discussion](https://github.com/vercel/next.js/discussions/19880), there is no built-in support for it at the moment. The workaround is `display: none` then `block` on each breakpoint. However, it seems all the images will be downloaded, which is bad for performance.

    Later, I changed it to display the image conditional on media queries.

5. How to provide a fallback values in Stitches?

6. How to set Storybook’s `argTypes` for props that are object?

7. Why does my `hamburger` SVG not work with sprite?
  
    [Because it’s not supposed to](https://github.com/svg-sprite/svg-sprite/issues/74) 😡

8. Set the hamburger button’s y axis using CSS variables worked in my desktop browser (FF) but not in my Android 11 Chrome.

9. What’s wrong with the following CSS `calc()`?

    `width: 'calc(84vw + (84vw - 45.8333vw) * (100vw - 20vw) / (90 - 20))'`

    See [linear-interpolation.js file](./linear-interpolation.js)

10. Is it possible to consolidate the `LastReadCard`, `ReviewCard`, and `UserReviewCard` components into a single component, where each one represents a Stitches variant? If so, would it be considered a good practice in React?

11. What’s the right initial value for `search` text: empty, undefined or null?

12. Why doesn't `MainLayout` stretch to fit the page height? To address this, I had to apply an `overflow` property to the layout container, which binds the scroll bar to the container. Consequently, the `HTML/body` content never exceeds the viewport height, preventing mobile browsers from hiding the address bar while scrolling

    1. It bothers me a lot, most because I don’t know why is causing the issue.

        Well, I know now. `container queries` was the problem.

    2. Also, [it’s the reason why the Next.js `<Link>` scroll is not working](https://www.reddit.com/r/nextjs/comments/1191ed9/comment/j9nug5c/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)!

13. Users are restricted to writing only one review per book. On the frontend, I have disabled the form button for users who have already written a review for a specific book. However, when it comes to the backend, the question arises: should I make a query to check whether the user has already written a review before creating a new one in the database? Is there a more efficient solution available?

14. What if I make `LastReadSection` collapsible, allowing it to transition smoothly from closed to open, similar to the form in the drawer? This would help prevent any layout shift when the section pops up.

    I don't think so, dude.

15. The `usePreserveScroll` hook works fine to maintain the page scroll position for both Home and Explorer pages, but not for Profile 🤔 why?

### Continued development

1. Pagination / Infinite scrolling

2. Unit tests

3. The project uses Pages Router. Refactor to Next.js’s App directory is a good improvement since it’s recommend now.

4. Improve the API Routes’ error handling. For example, check the type of the error to return an appropriate message.

5. Refactor the API Routes to make use of middleware which can improve the authentication and error handlings.

6. I used logical properties for paddings, margins, insets. I need to consistently use them for every other property.

7. I realize that I should have created Stitches components for box, typography, icons, and general common styles. Throughout the project, I found myself duplicating code to style text and cards, which could have been avoided if I had a centralized component for these shared styles.

    Damn! How I wish I know how to refactor this shit.

8. I spent hours trying to implementing a way to prevent layout shift when `LastReadSection` pops up. It worked but it required too many grid manipulation. I end up accepting the shifting 😞.

9. I failed in implement an `utils` function the accepts values of type `Array<ScaleValue<T> | [ScaleValue<T>, ScaleValue<T>]>`. I think it’s because of a [type definition limitations of Stitches](https://github.com/stitchesjs/stitches/issues/763).

### Useful resources

1. [.prettierignore ignore everything except specific folder · Issue #578 · prettier/prettier-vscode](https://github.com/prettier/prettier-vscode/issues/578)

2. [How to remove storybook from the react project - Stack Overflow](https://stackoverflow.com/questions/68062232/how-to-remove-storybook-from-the-react-project)

3. [Storybook + NextJs with TypeScript Paths set](https://himynameistim.com/blog/storybook-nextjs-with-typescript-paths-set)

4. [Styling Addon: configure styles and themes in Storybook](https://storybook.js.org/blog/styling-addon-configure-styles-and-themes-in-storybook/)

5. [TypeScript convert generic object from snake to camel case - Stack Overflow](https://stackoverflow.com/questions/60269936/typescript-convert-generic-object-from-snake-to-camel-case)

6. [Next.js 13 Middleware for Authentication and Error Handling on API Routes](https://jasonwatmore.com/next-js-13-middleware-for-authentication-and-error-handling-on-api-routes)

7. [When should I use useEffect hook instead of event listeners? - Stack Overflow](https://stackoverflow.com/questions/72273870/when-should-i-use-useeffect-hook-instead-of-event-listeners)

8. [REST - Shouldn't PUT = Create and POST = Update - Stack Overflow](https://stackoverflow.com/questions/10885152/rest-shouldnt-put-create-and-post-update)

9. [The simple trick to transition from height 0 to auto with CSS](https://youtu.be/B_n4YONte5A)

10. [How to use next.js Image component with HTML `<picture>` element? - Stack Overflow](https://stackoverflow.com/questions/71275942/how-to-use-next-js-image-component-with-html-picture-element)

11. [Advanced page transitions with Next.js and Framer Motion - LogRocket Blog](https://blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/)

12. [CSS Variables (custom properties) in Pseudo-element "content" Property](https://stackoverflow.com/a/40179718/21858786)

13. [An Auto-Filling CSS Grid With Max Columns of a Minimum Size](https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/)

14. [A Good Setup for Responsive SSR React Apps](https://www.paulashraf.com/blog/react-ssr-responsive)

15. [Add Opacity to an Existing Color](https://chriscoyier.net/2023/05/12/add-opacity-to-an-existing-color/?utm_source=convertkit&utm_medium=email&utm_campaign=CSS+falling+into+disrepair%20-%2010925485#top-of-site)

16. [Preserve Scroll History | by Jakob Chill | Medium](https://jak-ch-ll.medium.com/next-js-preserve-scroll-history-334cf699802a)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)

## ~~The Big Brainz Theory~~

### Basics RESTful API conventions

  In a RESTful API, HTTP verbs are used to indicate the type of operation being performed on a resource. Here are some common HTTP verbs and their meanings in a RESTful context:

- **`GET`**: Retrieve a representation of a resource
- **`POST`**: Create a new resource
- **`PUT`**: Update an existing resource
- **`DELETE`**: Delete a resource

    In terms of naming convention, it's important to follow a consistent and descriptive naming scheme for resources and their associated endpoints. Here are some best practices:

- Use nouns to represent resources (e.g., **`/users`**, **`/books`**, **`/reviews`**)
- Use lowercase letters and hyphens to separate words in resource names (e.g., **`/user-reviews`**, **`/book-reviews`**)
- Use plural nouns for collections of resources (e.g., **`/users`**, **`/books`**)
- Use HTTP verbs to indicate the action being performed on a resource (e.g., **`GET /users`** to retrieve a list of users)
- Use specific resource identifiers to indicate a specific resource (e.g., **`/users/123`** to retrieve user with ID 123)

    Following these naming conventions helps make your API more intuitive and easier to use, as well as consistent with other RESTful APIs.

## Project Initial Setup

- [x]  Start up a new Next project
    1. `npx create-nextapp@latest`
    2. Add favicon
    3. Setup `pageExtensions` in `next.config.js`
    4. Setup Next font
    5. Define the global CSS rules
        1. Install Stitches
        2. Import `globalStyles`
    6. Setup SSR for styles
    7. Extends Rocketseat ESLint config
- [x]  Setup Prisma
    1. `npm i -D prisma` CLI
    2. `npm i @prisma/client` API
    3. `npx prisma init --datasource-provider SQLite`
    4. Ignore `.env` file
    5. Paste the models
        1. Define the Shelf model
    6. `touch src/lib/prisma.ts`
    7. Populate the database
        1. `npx prisma db seed`
    8. `npx prisma migrate dev`
    9. `npx prisma studio`
- [x]  Implement a simple API Route that retrieves data from database
- [x]  Implement a basic component that makes use of that endpoint
    1. `npm i axios`
    2. `touch src/lib/axios.ts`
- [x]  Setup Storybook
    1. `npx storybook@latest init`
        1. Define the `webpackFinal` in `main.ts` to resolve path alias
        2. Add `staticDirs` in `main.ts`
        3. Add dark theme to `docs` in `preview.ts`
        4. Add styling addon so the stories inherit them all. No need to import fonts in `preview-head.html` (at least when using Next Fonts)
    2. Define the component’s story
