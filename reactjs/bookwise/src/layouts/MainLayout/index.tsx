import { ReactNode } from 'react'
import { MainLayoutContainer, S_MainLayout } from './styles'
import { AppBar } from './components/AppBar'
import { BookDrawer } from './components/BookDrawer'
import { MainLayoutProvider } from '@/contexts/MainLayoutContext'

export interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <MainLayoutProvider>
      <S_MainLayout>
        <AppBar />
        <MainLayoutContainer>{children}</MainLayoutContainer>
      </S_MainLayout>
      <BookDrawer />
    </MainLayoutProvider>
  )
}
