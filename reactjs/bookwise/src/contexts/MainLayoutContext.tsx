import { ReactNode, createContext, useState } from 'react'

interface MainLayoutContextProps {
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

export const MainLayoutContext = createContext({} as MainLayoutContextProps)

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <MainLayoutContext.Provider value={{ drawerOpen, setDrawerOpen }}>
      {children}
    </MainLayoutContext.Provider>
  )
}
