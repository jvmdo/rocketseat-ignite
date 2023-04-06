import { styled } from '@/styles/stitches.config'
import { ReactNode } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { CartDrawer } from './components/CartDrawer'

/* 
  Styles
*/
const S_Layout = styled('div', {
  minHeight: '100vh',
  paddingBlock: '$pageBlockPadding',

  display: 'grid',
  gridTemplateRows: 'auto min($heightMain, 80rem) auto',
  alignContent: 'center',
  gap: '$defaultLayoutGridGap',
})

/* 
  Component
*/
interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <S_Layout>
      <Header />
      <CartDrawer />
      {children}
      <Footer />
    </S_Layout>
  )
}
