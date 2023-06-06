import { styled } from '@/styles/stitches.config'

export const S_MainLayout = styled('div', {
  container: 'layout / size',

  '@lg': {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },

  responsivePaddingBlock: ['$2', '$3', '$3', '$4', '$5'],
  responsivePaddingInline: ['$2', '$3', '$3', ['$4', '$0'], ['$5', '$0']],

  // ? Due to the absolute positioning of [MainLayoutContainer],
  // ? [S_MainLayout] lost its height, causing the app bar to not stick to the top as intended
  // ? As a result, the following two properties are applied to address this issue.
  height: '100dvh',
  overflow: 'auto',

  // Page content stretches up to 1920x1440
  // It definitely won't please 4k screens users 😅
  position: 'absolute',
  inset: 0,
  margin: 'auto',
  maxHeight: '90rem',
  maxWidth: '120rem',

  // Target the Next.js wrapper
  // '*:has(> &)': {
  //   minWidth: '100vw',
  // },
})

export const MainLayoutContainer = styled('div', {
  position: 'absolute',
  insetInline: 0,

  $$containerPaddingInline: '$space$6',
  '@sm': { $$containerPaddingInline: '$space$8' },
  '@md': { $$containerPaddingInline: '$space$10' },
  '@lg': {
    $$containerPaddingInline: '$space$10',

    position: 'unset',

    responsiveMarginBlock: ['-1', '$2', '$3', '$3', '$4', '$5'],
  },
  '@xl': { $$containerPaddingInline: '$space$14' },
  '@xxl': { $$containerPaddingInline: '$space$24' },

  paddingInline: '$$containerPaddingInline',
  responsivePaddingBlock: [
    '$4',
    '$6',
    '$8',
    ['$12', '$4'],
    ['$14', '$5'],
    ['$18', '$5'],
  ],
})
