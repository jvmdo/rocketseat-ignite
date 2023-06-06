import { BookCardProps } from '@/components/BookCard'
import { ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface MainLayoutContextProps {
  drawerBook: BookCardProps | undefined
  setDrawerBook: (drawerBook: BookCardProps | undefined) => void
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  appBarTriggerRef: RefObject<HTMLButtonElement>
}

export const MainLayoutContext = createContext({} as MainLayoutContextProps)

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [drawerBook, setDrawerBook] = useState<BookCardProps | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const appBarTriggerRef = useRef<HTMLButtonElement>(null)

  return (
    <MainLayoutContext.Provider
      value={{
        drawerBook,
        setDrawerBook,
        dialogOpen,
        setDialogOpen,
        appBarTriggerRef,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  )
}
