import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from './styles/themes/LightTheme'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
