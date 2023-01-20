import 'styled-components'
import { LightTheme } from '../styles/themes/LightTheme'

type ThemeType = typeof LightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
