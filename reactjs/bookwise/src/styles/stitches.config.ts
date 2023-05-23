import { createStitches } from '@stitches/react'
import type { ScaleValue } from '@stitches/react'
import {
  FluidFontSize,
  LogicalValue,
  clamp,
  formatLogicalProp,
} from './helpers'

export const { styled, theme, css, globalCss, keyframes, config, getCssText } =
  createStitches({
    theme: {
      fonts: {
        default: 'Nunito Sans, sans-serif',
      },

      space: {
        0: 0,
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
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
        danger: '#F75A68',

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

        'gray200-0a': '#E6E8F20A',
        'purple100-0f': '#8381D90F',
      },

      radii: {
        xs: '4px',
        sm: '8px',
        md: '10px',
        lg: '12px',
        xlg: '20px',
        full: '99999px',
      },

      transitions: {
        'action-in-out': '150ms cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        collapse: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        content: '500ms cubic-bezier(0.23, 1, 0.32, 1)',
        overlay: '250ms cubic-bezier(0.42, 0, 0.58, 1)',
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

      responsivePaddingBlock: (values: Array<LogicalValue>) => ({
        paddingBlock: formatLogicalProp(values[0]),
        '@sm': {
          paddingBlock: formatLogicalProp(values[1]),
        },
        '@md': {
          paddingBlock: formatLogicalProp(values[2]),
        },
        '@lg': {
          paddingBlock: formatLogicalProp(values[3]),
        },
        '@xl': {
          paddingBlock: formatLogicalProp(values[4]),
        },
        '@xxl': {
          paddingBlock: formatLogicalProp(values[5]),
        },
      }),

      responsivePaddingInline: (values: Array<LogicalValue>) => ({
        paddingInline: formatLogicalProp(values[0]),
        '@sm': {
          paddingInline: formatLogicalProp(values[1]),
        },
        '@md': {
          paddingInline: formatLogicalProp(values[2]),
        },
        '@lg': {
          paddingInline: formatLogicalProp(values[3]),
        },
        '@xl': {
          paddingInline: formatLogicalProp(values[4]),
        },
        '@xxl': {
          paddingInline: formatLogicalProp(values[5]),
        },
      }),

      responsiveMarginBlock: (values: Array<LogicalValue>) => ({
        marginBlock: formatLogicalProp(values[0]),
        '@sm': {
          marginBlock: formatLogicalProp(values[1]),
        },
        '@md': {
          marginBlock: formatLogicalProp(values[2]),
        },
        '@lg': {
          marginBlock: formatLogicalProp(values[3]),
        },
        '@xl': {
          marginBlock: formatLogicalProp(values[4]),
        },
        '@xxl': {
          marginBlock: formatLogicalProp(values[5]),
        },
      }),

      responsiveMarginInline: (values: Array<LogicalValue>) => ({
        marginInline: formatLogicalProp(values[0]),
        '@sm': {
          marginInline: formatLogicalProp(values[1]),
        },
        '@md': {
          marginInline: formatLogicalProp(values[2]),
        },
        '@lg': {
          marginInline: formatLogicalProp(values[3]),
        },
        '@xl': {
          marginInline: formatLogicalProp(values[4]),
        },
        '@xxl': {
          marginInline: formatLogicalProp(values[5]),
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

      responsiveWidth: (values: Array<string>) => ({
        width: values[0],
        '@sm': {
          width: values[1],
        },
        '@md': {
          width: values[2],
        },
        '@lg': {
          width: values[3],
        },
        '@xl': {
          width: values[4],
        },
        '@xxl': {
          width: values[5],
        },
      }),

      responsiveHeight: (values: Array<string>) => ({
        height: values[0],
        '@sm': {
          height: values[1],
        },
        '@md': {
          height: values[2],
        },
        '@lg': {
          height: values[3],
        },
        '@xl': {
          height: values[4],
        },
        '@xxl': {
          height: values[5],
        },
      }),

      fluidFontSize: (params: FluidFontSize) => ({
        fontSize: clamp({ ...params }),
      }),
    },
  } as const)
