import { EBook } from '@/@types/entities'
import { ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface MainLayoutContextProps {
  drawerBook: EBook | undefined
  setDrawerBook: (drawerBook: EBook | undefined) => void
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  appBarTriggerRef: RefObject<HTMLButtonElement>
}

export const MainLayoutContext = createContext({} as MainLayoutContextProps)

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [drawerBook, setDrawerBook] = useState<EBook | undefined>()
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
