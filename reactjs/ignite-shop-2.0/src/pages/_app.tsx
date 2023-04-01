import { DefaultLayout } from '@/layouts/DefaultLayout'
import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'

// Apply global CSS once for all pages
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
