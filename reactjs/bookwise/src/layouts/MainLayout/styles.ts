import { styled } from '@/styles/stitches.config'

export const S_MainLayout = styled('div', {
  container: 'layout / size',

  height: 'min(100dvh, 90rem)',
  maxWidth: '120rem',
  overflow: 'auto', // ? Why do I need to apply it?

  responsivePaddingBlock: ['$2', '$3', '$3', '$4', '$5'],
  responsivePaddingInline: ['$2', '$3', '$3', ['$4', '$0'], ['$5', '$0']],

  '@lg': {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },

  // Page content stretches up to 1920x1440
  // It definitely won't please 4k screens users 😅
  position: 'absolute',
  inset: 0,
  margin: 'auto',

  // Target the Next.js wrapper
  '#__next:has(> &)': {
    position: 'relative',
    minHeight: '100dvh',
  },
})

export const MainLayoutContainer = styled('div', {
  // Used to make some math in [TrendingBooks] component
  $$containerPaddingInline: '$space$6',
  '@sm': { $$containerPaddingInline: '$space$8' },
  '@md': { $$containerPaddingInline: '$space$10' },
  '@lg': { $$containerPaddingInline: '$space$10' },
  '@xl': { $$containerPaddingInline: '$space$14' },
  '@xxl': { $$containerPaddingInline: '$space$24' },

  responsiveMarginBlock: ['-1', '$2', '$3', '$3', '$4', '$5'],
  responsiveMarginInline: ['-1', '$2', '$3', '$3', '$0'],

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
