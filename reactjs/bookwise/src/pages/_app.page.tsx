/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const nunito = Nunito_Sans({ subsets: ['latin'] })

globalStyles()

setDefaultOptions({
  locale: ptBR,
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
