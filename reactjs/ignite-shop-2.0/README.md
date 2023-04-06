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
