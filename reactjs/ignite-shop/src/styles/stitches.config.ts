import { createStitches } from '@stitches/react'

export const { styled, css, theme, globalCss, getCssText, config } =
  createStitches({
    theme: {
      colors: {
        white: '#FFF',

        gray900: '#121214',
        gray800: '#202024',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',

        imageGradient: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
      },

      fontSizes: {
        rg: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        xxl: '2rem',
      },

      radii: {
        rg: '8px',
      },
    },

    media: {
      md: '(min-width: 48em)',
      lg: '(min-width: 62em)',
      '3xl': '(min-width: 96em)',
      maxMd: '(max-width: 48em)',
      maxLg: '(max-width: 62em)',
    },
  })
