import { styled } from '@/styles/stitches.config'

export const S_MainLayout = styled('div', {
  // Used to make some math in [AppBar] component
  $$layoutPaddingBlock: '$space$2',
  '@sm': { $$layoutPaddingBlock: '$space$3' },

  '@lg': {
    $$layoutPaddingBlock: '$space$4',

    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },

  '@xxl': {
    $$layoutPaddingBlock: '$space$5',

    margin: 'auto',
    maxWidth: '120rem', // Page width stretches up 1440px
  },

  paddingBlock: '$$layoutPaddingBlock',
  responsivePaddingInline: ['$2', '$3', '$3', ['$4', '$0'], ['$5', '$0']],
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
