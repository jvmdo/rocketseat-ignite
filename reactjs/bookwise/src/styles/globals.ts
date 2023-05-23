import { globalCss } from './stitches.config'

export const globalStyles = globalCss({
  // Reset
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    outlineColor: 'transparent',
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
    outline: '1px solid $white',
  },

  ':is(input, textarea)': {
    fontFamily: 'inherit',
  },

  ':is(input, textarea):is(:focus-within)': {
    outline: '1px solid $green100',
  },

  ':is(img, svg)': {
    maxWidth: '100%',
    verticalAlign: 'top',
  },

  ':is(ul, ol)': {
    listStyleType: 'none',
  },

  // General
  html: {
    backgroundColor: '$gray800',
    color: '$gray300',
    fontFamily: '$default', // See _app.tsx
    fontWeight: '$regular',
    lineHeight: '$base',

    scrollbarColor: '$colors$gray600 $colors$gray700',

    '::-webkit-scrollbar-track': {
      backgroundColor: '$colors$gray700',
      borderRadius: '$full',
    },

    '::-webkit-scrollbar-thumb': {
      backgroundColor: '$colors$gray600',
      borderRadius: '$full',

      '&:hover': {
        backgroundColor: 'color-mix(in srgb, $gray600 50%, $gray500)',
      },
    },
  },

  body: {
    minHeight: '100vh',
    minWidth: '20rem',
  },

  // I should've set `line-height`s globally
})
