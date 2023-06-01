import { ReactNode, createContext, useState } from 'react'

interface MainLayoutContextProps {
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export const MainLayoutContext = createContext({} as MainLayoutContextProps)

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <MainLayoutContext.Provider
      value={{ drawerOpen, setDrawerOpen, dialogOpen, setDialogOpen }}
    >
      {children}
    </MainLayoutContext.Provider>
  )
}
