import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  )
}
