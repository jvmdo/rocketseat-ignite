# questions

1. formatLineItems() seems very useful. Unfortunately, there is a bug in its import.

2. I encountered an issue where the cart items were getting lost during navigation. After seeking advice from ChatGPT, it suggested some potential causes for the problem:

    > If you're using `<Link/>` from Next.js, it may be causing the cart items to be lost when you navigate. This is because `<Link/>` performs client-side navigation and does not rehydrate the shopping cart state that was previously saved in the server-side rendering.

    It does seem plausible that the issue could be related to hydration failure during the initial app render in Next.js, which is the error message being displayed. However, I'm not entirely certain. I had assumed that the context provided by `<CartProvider/>` would be enough to maintain the state between navigations, similar to how the `<FormProvider/>` from the react-hook-form library works.

    **How did I fix it?** I set `<CartProvider shouldPersist={true}/>`.
