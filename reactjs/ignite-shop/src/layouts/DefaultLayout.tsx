import { styled } from '@/styles/stitches.config'
import { ReactNode } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

interface DefaultLayoutProps {
  children: ReactNode
}

const S_Layout = styled('div', {
  paddingBlock: '$pageBlockPadding',

  $$mainHeight: '$sizes$vwMainHeight',
  '@media (orientation: landscape)': {
    $$mainHeight: '$sizes$vhMainHeight',
  },

  // TODO: fix centering issue in 4k screens (try set min-height: 100vh + center)
  display: 'grid',
  gridTemplateRows: 'auto min($$mainHeight, 80rem) auto',
  alignContent: 'center',
  gap: '$defaultLayoutGridGap',
})

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <S_Layout>
      <Header />
      {children}
      <Footer />
    </S_Layout>
  )
}
