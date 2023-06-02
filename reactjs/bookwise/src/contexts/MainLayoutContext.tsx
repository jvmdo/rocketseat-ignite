import { BookCardProps } from '@/components/BookCard'
import { ReactNode, createContext, useState } from 'react'

interface MainLayoutContextProps {
  drawerBook: BookCardProps | undefined
  setDrawerBook: (drawerBook: BookCardProps | undefined) => void
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export const MainLayoutContext = createContext({} as MainLayoutContextProps)

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [drawerBook, setDrawerBook] = useState<BookCardProps | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <MainLayoutContext.Provider
      value={{
        drawerBook,
        setDrawerBook,
        dialogOpen,
        setDialogOpen,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  )
}
