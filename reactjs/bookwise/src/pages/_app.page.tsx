// eslint-disable-next-line camelcase
import { Nunito_Sans } from 'next/font/google'
import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MainLayout } from '@/layouts/MainLayout'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { MainLayoutProvider } from '@/contexts/MainLayoutContext'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const nunito = Nunito_Sans({ subsets: ['latin'] })

globalStyles()
setDefaultOptions({ locale: ptBR })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>

      <MainLayoutProvider>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </MainLayoutProvider>
    </>
  )
}
