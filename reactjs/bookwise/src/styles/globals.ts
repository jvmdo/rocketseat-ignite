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
    outlineWidth: '2px',
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
    backgroundColor: '$gray800',
    color: '$gray300',
    fontFamily: '$default', // See _app.tsx
    fontWeight: '$regular',
    lineHeight: '$base',
  },

  body: {
    minHeight: '100vh',
    minWidth: '20rem',
  },
})
