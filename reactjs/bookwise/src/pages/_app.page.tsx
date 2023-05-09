/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'

const nunito = Nunito_Sans({ subsets: ['latin'] })
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
