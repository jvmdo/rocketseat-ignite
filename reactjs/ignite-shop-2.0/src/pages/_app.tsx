import { DefaultLayout } from '@/layouts/DefaultLayout'
import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

// Apply global CSS once for all pages
globalStyles()

const stripePK = process.env.NEXT_PUBLIC_STRIPE_PK_TEST ?? ''

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={stripePK}
      currency="USD"
      shouldPersist={false}
    >
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </CartProvider>
  )
}
