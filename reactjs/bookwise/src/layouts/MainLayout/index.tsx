import { ReactNode, MouseEvent, useContext } from 'react'
import { MainLayoutContainer, S_MainLayout } from './styles'
import { AppBar } from './components/AppBar'
import { BookDrawer } from './components/BookDrawer'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { AuthDialog } from '@/components/AuthDialog'

export interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { appBarTriggerRef } = useContext(MainLayoutContext)

  function handleAppBarClose(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement

    if (target.closest('#app-bar')) return

    const trigger = appBarTriggerRef.current

    if (trigger && trigger.dataset.state === 'open') {
      trigger.click()
    }
  }

  return (
    <>
      <S_MainLayout onClick={handleAppBarClose}>
        <AppBar />
        <MainLayoutContainer>{children}</MainLayoutContainer>
      </S_MainLayout>
      <BookDrawer />
      <AuthDialog />
    </>
  )
}
