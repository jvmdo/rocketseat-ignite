import { styled } from '@/styles/stitches.config'
import { ReactNode } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

interface DefaultLayoutProps {
  children: ReactNode
}

const S_Layout = styled('div', {
  minHeight: '100vh',
  paddingBlock: '$pageBlockPadding',

  display: 'grid',
  gridTemplateRows: 'auto min($heightMain, 80rem) auto',
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
