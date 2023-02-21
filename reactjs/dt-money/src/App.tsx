import { ThemeProvider } from 'styled-components'
import { Header } from './components/Header'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Home } from './pages/Home'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Home />
      <GlobalStyle></GlobalStyle>
    </ThemeProvider>
  )
}