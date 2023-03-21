import { globalCss } from './stitches.config'

export const globalStyles = globalCss({
  // Reset
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    outlineColor: '$white',
    padding: 0,
  },

  a: {
    color: 'inherit',
    outline: 'none',
    textDecoration: 'none',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },

  // General
  html: {
    backgroundColor: '$gray900',
    color: '$gray100',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
  },

  body: {
    minHeight: '100vh',
    minWidth: '20rem',
  },
})
