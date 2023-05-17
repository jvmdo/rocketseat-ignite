import { createStitches } from '@stitches/react'
import type { ScaleValue } from '@stitches/react'
import { FluidFontSize, clamp, formatPadding } from './utils'

export const { styled, theme, css, globalCss, keyframes, config, getCssText } =
  createStitches({
    theme: {
      fonts: {
        default: 'Nunito Sans, sans-serif',
      },

      space: {
        px: '1px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        10: '2.5rem',
      },

      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        xxl: '1.5rem',
      },

      fontWeights: {
        regular: '400',
        medium: '500',
        bold: '700',
      },

      lineHeights: {
        shorter: '125%',
        short: '140%',
        base: '160%',
        tall: '180%',
      },

      colors: {
        white: '#FFFFFF',
        black: '#000000',

        green100: '#50B2C0',
        green200: '#255D6A',
        green300: '#0A313C',

        purple100: '#8381D9',
        purple200: '#2A2879',

        gray100: '#F8F9FC',
        gray200: '#E6E8F2',
        gray300: '#D1D6E4',
        gray400: '#8D95AF',
        gray500: '#303F73',
        gray600: '#252D4A',
        gray700: '#181C2A',
        gray800: '#0E1116',

        'gradient-vertical': `linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)`,
        'gradient-horizontal': `linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)`,
      },

      radii: {
        xs: '2.5px',
        sm: '8px',
        md: '10px',
        lg: '20px',
        full: '99999px',
      },

      transitions: {
        'action-in-out': ' 150ms cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      },
    },

    media: {
      xs: '(min-width: 23.4375em)', // 375px
      sm: '(min-width: 36em)', // 576px
      md: '(min-width: 48em)', // 768px
      lg: '(min-width: 62em)', // 992px
      xl: '(min-width: 75em)', // 1200px
      xxl: '(min-width: 87.5em)', // 1400px

      l: '(orientation: landscape)',
      p: '(orientation: portrait)',
    },

    utils: {
      responsiveFontSize: (values: Array<ScaleValue<'fontSizes'>>) => ({
        fontSize: values[0],
        '@sm': {
          fontSize: values[1],
        },
        '@md': {
          fontSize: values[2],
        },
        '@lg': {
          fontSize: values[3],
        },
        '@xl': {
          fontSize: values[4],
        },
        '@xxl': {
          fontSize: values[5],
        },
      }),

      responsivePaddingBlock: (values: Array<ScaleValue<'space'>>) => ({
        paddingBlock: formatPadding(values[0]),
        '@sm': {
          paddingBlock: formatPadding(values[1]),
        },
        '@md': {
          paddingBlock: formatPadding(values[2]),
        },
        '@lg': {
          paddingBlock: formatPadding(values[3]),
        },
        '@xl': {
          paddingBlock: formatPadding(values[4]),
        },
        '@xxl': {
          paddingBlock: formatPadding(values[5]),
        },
      }),

      responsivePaddingInline: (values: Array<ScaleValue<'space'>>) => ({
        paddingInline: formatPadding(values[0]),
        '@sm': {
          paddingInline: formatPadding(values[1]),
        },
        '@md': {
          paddingInline: formatPadding(values[2]),
        },
        '@lg': {
          paddingInline: formatPadding(values[3]),
        },
        '@xl': {
          paddingInline: formatPadding(values[4]),
        },
        '@xxl': {
          paddingInline: formatPadding(values[5]),
        },
      }),

      responsiveGap: (values: Array<ScaleValue<'space'>>) => ({
        gap: values[0],
        '@sm': {
          gap: values[1],
        },
        '@md': {
          gap: values[2],
        },
        '@lg': {
          gap: values[3],
        },
        '@xl': {
          gap: values[4],
        },
        '@xxl': {
          gap: values[5],
        },
      }),

      fluidFontSize: (params: FluidFontSize) => ({
        fontSize: clamp({ ...params }),
      }),
    },
  } as const)
