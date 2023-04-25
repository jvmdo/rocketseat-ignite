import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --font-family: ${roboto.style.fontFamily};
        }`,
        }}
      />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
