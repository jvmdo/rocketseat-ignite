import { useEffect } from 'react'
import { ReactNode } from 'react-markdown/lib/ast-to-react'
import { useLocation } from 'react-router'

interface ComponentProps {
  children: ReactNode
}

function ScrollToTop({ children }: ComponentProps) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{children}</>
}

export default ScrollToTop
