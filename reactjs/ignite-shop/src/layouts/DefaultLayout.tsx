import { styled } from '@/styles/stitches.config'
import { ReactNode } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

interface DefaultLayoutProps {
  children: ReactNode
}

const S_Layout = styled('div', {
  height: '100vh',
  display: 'grid',
  gridTemplateRows: 'auto minmax(auto, 80rem) auto',
  alignContent: 'center',
  gap: '0.25rem',
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
