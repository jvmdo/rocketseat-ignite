import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { globalStyles } from '../src/styles/globals'
import { theme } from '../src/styles/stitches.config'

export default {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    }
  },
} as Preview

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: globalStyles,
    themes: { dark: theme },
    defaultTheme: 'dark',
  }),
];


