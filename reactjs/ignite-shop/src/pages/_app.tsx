import { globalStyles } from '@/styles/globals'
import { styled } from '@/styles/stitches.config'
import type { AppProps } from 'next/app'

// Apply global CSS once for all pages
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const ButtonTest = styled('button', {
    color: '$green500',
    backgroundColor: '$gray300',
    '&:hover': {
        border: '2px dashed $green300',
    },
    '&::before': {
        content: '->'
    },
})

  return <>
    <ButtonTest>Button Test</ButtonTest>
    <Component {...pageProps} />
  </>
}
