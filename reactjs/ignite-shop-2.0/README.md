# questions

1. formatLineItems() seems very useful. Unfortunately, there is a bug in its import.

2. I encountered an issue where the cart items were getting lost during navigation. After seeking advice from ChatGPT, it suggested some potential causes for the problem:

    > If you're using `<Link/>` from Next.js, it may be causing the cart items to be lost when you navigate. This is because `<Link/>` performs client-side navigation and does not rehydrate the shopping cart state that was previously saved in the server-side rendering.

    It does seem plausible that the issue could be related to hydration failure during the initial app render in Next.js, which is the error message being displayed. However, I'm not entirely certain. I had assumed that the context provided by `<CartProvider/>` would be enough to maintain the state between navigations, similar to how the `<FormProvider/>` from the react-hook-form library works.

    **SOLUTION.** I set `<CartProvider shouldPersist={true}/>`.

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
