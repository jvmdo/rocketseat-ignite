import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Post } from './pages/Post'
import { Header } from './components/Header'
import { Home } from './pages/Home'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      {/* <Home /> */}
      <Post />
    </ThemeProvider>
  )
}
