import { ReactNode, createContext, useState } from 'react'

interface MainLayoutContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const MainLayoutContext = createContext({} as MainLayoutContextProps)

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <MainLayoutContext.Provider value={{ open, setOpen }}>
      {children}
    </MainLayoutContext.Provider>
  )
}
