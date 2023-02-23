import { ThemeProvider } from 'styled-components'
import { Header } from './components/Header'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Home } from './pages/Home'
import { TransactionsProvider } from './contexts/TransactionsContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <Header />
        <Home />
      </TransactionsProvider>
      <GlobalStyle></GlobalStyle>
    </ThemeProvider>
  )
}
