import { Box, Heading, Text, globalCss } from '@ignite-ui/react'

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
    color: '$gray200',
    fontFamily: 'var(--font-family)', // See _app.tsx
    fontWeight: '$regular',
    lineHeight: '$base',
  },

  body: {
    minHeight: '100vh',
    minWidth: '20rem',
  },

  [`${Heading}`]: {
    color: '$white !important',
  },

  [`${Text}`]: {
    color: '$gray200 !important',
  },

  [`${Box}`]: {
    '& div:has(> input):focus-within': {
      outlineColor: '$ignite300',
    },
  },
})

export const breakpoints = {
  xs: '23.4375em',
  sm: '36em',
  md: '48em',
  lg: '62em',
  xl: '75em',
  xxl: '87.5em',
} as const
