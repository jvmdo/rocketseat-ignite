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
    textDecoration: 'none',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  ':is(a, button):is(:focus-visible)': {
    outline: '2px solid $white',
  },

  ':is(img, svg)': {
    maxWidth: '100%',
    verticalAlign: 'top',
  },

  ul: {
    listStyleType: 'none',
  },

  // General
  html: {
    backgroundColor: '$gray900',
    color: '$gray100',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    lineHeight: 1.6,
  },

  body: {
    minHeight: '100vh',
    minWidth: '20rem',
  },
})
