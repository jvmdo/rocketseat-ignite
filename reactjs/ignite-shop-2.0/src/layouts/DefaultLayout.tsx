import { styled } from '@/styles/stitches.config'
import { ReactNode, useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S_Layout>
      <Header openDrawer={setIsOpen} />
      <CartDrawer open={isOpen} toggleOpen={setIsOpen} />
      {children}
      <Footer />
    </S_Layout>
  )
}
