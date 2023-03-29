# NextJS Foundations

## What is NextJS

Next.js is a powerful full-stack framework built on top of React. It simplifies the tooling and configuration required for a React application, while also offering advanced features such as server-side rendering, data fetching, routing, serverless functions. With Next, developers can focus on building their application logic and user interface, while leaving the heavy lifting of deployment and optimization to the framework.

## Rendering

Rendering is the process of transforming React code into HTML (i.e., JSX --> HTML). It can take place on the server or on the client, happening either ahead of time (at build time) or on every request (at runtime).

With Next.js, three types of rendering methods are available: Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR).

> **Pre-Rendering**. SSR and SSG are also referred to as Pre-Rendering because the fetching of external data and rendering happen before the result is sent to the client.

### Client-Side Rendering

CSR is the default behavior in React. When a user requests a page, the server sends an empty HTML file and a JavaScript file to the client, which renders the UI using JavaScript code. This means that the initial UI state is a blank page until the JS code runs on the client-side to generate the actual UI that the user sees on the screen. CSR allows for dynamic and interactive user interfaces without requiring a full page refresh.

### Server-Side Rendering

SSR is the default behavior in Next.js. When a user requests a page, the server generates and sends non-interactive HTML, a JavaScript file, and a JSON data file to the client. The HTML code is used to render the initial UI state, which includes page content but no interactivity. The JS code then runs on the client-side to make the page fully interactive. This approach allows for faster initial load times and improved SEO, since search engines can crawl the fully rendered HTML content.

> **Hydration**. The process of adding interactivity to pre-rendered pages without having to refresh the entire page.

### Static Site Generation

Static Site Generation (SSG) is another rendering pattern offered by Next.js. When a user requests a page, the server sends back the complete HTML for that page without having to compute it, because the pre-rendering process is done at build time. If some page only contains static content, Next will automatically assume it's static. This allows for faster page loads and improved SEO, since search engines can index the fully rendered HTML content.

> Next.js provides developers with the flexibility to choose the most appropriate rendering method for their use case, allowing them to optimize page load times and user experience on a page-by-page basis.

## NextJS Basics

### Create a NextJS app

```bash
  npx create-next-app@latest
```

### TypeScript

TypeScript is automatically setup when it's selected from the interactive CLI tool.

### ESLint

Next.js provides an integrated ESLint experience out of the box. Additionally, I extended another lint config that also formats the code.

Moreover, I added a TypeScript linting to npm scripts:

```json
  "scripts": {
    "lint": "next lint && npx tsc --noEmit"
  }
```

### The ```_document.tsx``` file

`pages/_document.tsx` is used to set up the overall structure of the HTML document, including the head and body tags, and any other common settings that apply to all pages of your application. This file is only loaded once per application load, as it is responsible for rendering the HTML document that is served to the client.

> You should be careful when adding code or imports to this file, as they will affect the entire application. It's generally recommended to keep _document.tsx as lean as possible and only include the essential HTML and common settings that apply to all pages of your application.

### The ```_app.tsx``` file

`_app.tsx` serves as a wrapper for each page. This means that any code or imports added to `_app.tsx` will be loaded on every page of your application. Below, `Component` is the current page and `pageProps` is an object returned from one of the data fetching methods.

```tsx
  export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }
```

This file is a good place for:

1. Share common layout between pages;
2. Persist state when navigating;
3. Inject additional data into pages and
4. Import global styles.

> In general, it's recommended to import global styles in _app.tsx using the import statement, as this allows you to take advantage of Next.js's built-in CSS handling, such as automatic code splitting and server-side rendering. However, if you have global styles that need to be applied outside the React component tree, such as font imports or other non-CSS files, you can import them in_document.tsx.

### CSS-in-JS with SSR

It depends on the CSS library or technique applied:

1. By default, CSS modules in Next.js use SSR that generates a CSS file for each component, which is then injected into the HTML on the server-side. This ensures that the styles are available before the component is rendered on the client-side.

2. In case of Stitches, it's as simple as add a `<style>` tag in the `<Head>` as [described here](reactjs/ignite-shop/Stitches.md)

### Layouts

Next.js layouts provide a way to define a common structure for pages in your Next.js application. A layout is a higher-order component that wraps a page component, allowing you to share common components and functionality across multiple pages.

Layouts can be used to define a common header, footer, navigation bar, or any other component that needs to be displayed across multiple pages in your application. By using layouts, you can avoid duplicating the same code across multiple pages, and you can keep your code more organized and easier to maintain.

### Images

Importing return an object that holds a src among other image properties

Inline width and height are required. Pass the maximum width and height in this props and, in the image styling, use your preferred value. However, if you set only one dimension (for example, height), you must set the width to auto, otherwise the image will match the inline maximum values.

### Environment variables

Create the `.env.local` file where the variables are placed like that:

```bash
PUBLIC_KEY=XXXXXXXXXXXXXXXX
SECRET_KEY=YYYYYYYYYYYYYYYY
```

The variables can be accessed in pre-rendering methods and API routes:

```js
const key = process.env.PUBLIC_KEY
```

### Routing

Next.js has a file-system based router built on the concept of pages. When a file is added to the pages directory, it's automatically available as a route.

Nested routes are created from nested folders.

Dynamic routes are created from files which name is surrounded by brackets, such as `pages/products/[id].ts`.

`<Link href="">` component is used to create client-side navigation between pages. When a user clicks on a `<Link/>`, it automatically performs a client-side transition to the new page, without requiring a full page refresh.

### Make use of SRR with getServerSideProps

Exporting a function named `getServerSideProps` in a page tells Next.js that the page want to make use of its SRR features.

  ```ts
  export const getServerSideProps: GetServerSideProps = async (context) => {
    // code...
    return {
      props: { data }
    }
  }
  ```

The context parameter is an object that includes, amongst other properties:

  1. `params`: the parameters for dynamic routes
  2. `req`: the request object
  3. `res`: the response object

The method should return an object that includes the props the page expects to receive.

Tip: Passing `Pick<MyInterface, someProperty>` as generic for `GetServerSideProps` will type the function for an individual properties.

### Make use of SSG with getStaticProps

Exporting a function named `getStaticProps` in a page tells Next.js that the page want to make use of its SSG features.

```ts
  export const getStaticProps: GetStaticProps = async(context) => {
    // code...
    return {
      props: { data },
      revalidate: 60 * 60 * 24, // 24 hours
    }
  }
```

The main object included in `context` is `params`.

`revalidate` is the amount of seconds it takes to re-generate the page.

OBS: in development mode, this method runs on every request. In order to leverage its full potential, you need `npm run build` the app.

### Make use of SSG for dynamic routes with getStaticPaths

When you want to static generate dynamic routed pages, `getStaticPaths` is needed to retrieve the list of paths that routes to the target pages. You can control which pages will be pre-rendering by filtering this list of paths.

```js
export const getStaticPaths: GetStaticPaths =  async () => {
  // fetch paths...
  return {
    paths: [
      { params: { id: 1 } },
      { params: { id: 2 } },
      ...
    ],
    fallback: boolean | "blocking"
  }
}
```

The `fallback` parameter is useful for requested pages that has not been pre-built during the build process. This parameter can assume three values:

1. `fallback: false`: If a page has not been pre-built, Next.js will return a 404 error. This is the default behavior.

2. `fallback: true`:  When a user requests a page that has not been pre-built yet, Next.js will generate the page on the server and cache it. The next user to request the same page will receive the pre-built version instead of triggering another server-side render. This can result in faster response times for pages that are not requested frequently.

3. `fallback: blocking`: similar to `true`, however the user's request is not immediately sent back a page with empty data while the page is being generated. Instead, the user's request is held until the page has been generated on the server and is ready to be returned.

### API Routes

API Routes provide a simple way to create serverless functions that run on the server-side and can be used to handle HTTP requests, process data, and return responses.

Here are some best use cases for Next.js API Routes:

1. Creating a backend for a web application - You can use API Routes to create a simple backend for your web application that handles database queries, authentication, and other server-side logic.

2. Creating a REST API - API Routes provide a simple way to create a REST API that can be used by other applications or services.

3. Building webhooks - You can use API Routes to build webhooks that are triggered by events in your application and perform actions in response.

4. Integrating with third-party APIs - API Routes can be used to integrate with third-party APIs and services by handling the authentication, processing data, and returning responses.

5. Creating custom server-side logic - You can use API Routes to create custom server-side logic that performs complex computations, generates reports, or processes data.

API Routes can be created by adding a file to the pages/api directory of your Next.js app. The file should export default a function that takes in a `req` and `res` object and returns a JSON response. You can use any Node.js middleware or library in your API Route, allowing you to create complex server-side logic with ease.

### Better SEO with `<Head/>`

Add metadata to individual pages using the `<Head/>` component. It's also useful to set the page title.
