/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MainLayout } from '@/layouts/MainLayout'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

const nunito = Nunito_Sans({ subsets: ['latin'] })

globalStyles()

setDefaultOptions({
  locale: ptBR,
})

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>

      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </>
  )
}
