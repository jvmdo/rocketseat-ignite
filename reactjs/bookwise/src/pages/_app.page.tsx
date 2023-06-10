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
import { SWRConfig } from 'swr'
import { AxiosError } from 'axios'
import { DefaultSeo } from 'next-seo'
import { usePreserveScroll } from '@/hooks/usePreserveScroll'

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

  function handleSwrError(error: AxiosError, key: string) {
    alert(
      `Falha ao recuperar dados. Pressione CTRL + F5 e tente novamente.\n
        key: ${key}
        code: ${error.code}
        message: ${error.message}`,
    )
    console.error({ [key]: error })
  }

  usePreserveScroll()

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>

      <DefaultSeo
        defaultTitle="BookWise"
        titleTemplate="BookWise | %s"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://bookwise-jvmdo.vercel.app/',
          siteName: 'BookWise',
        }}
      />

      <MainLayoutProvider>
        <SessionProvider session={session}>
          <SWRConfig value={{ onError: handleSwrError }}>
            {getLayout(<Component {...pageProps} />)}
          </SWRConfig>
        </SessionProvider>
      </MainLayoutProvider>
    </>
  )
}
