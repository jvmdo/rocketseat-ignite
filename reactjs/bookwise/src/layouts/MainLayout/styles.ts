import { styled } from '@/styles/stitches.config'

export const S_MainLayout = styled('div', {
  // Variable used to calc app bar height
  $$layoutPaddingBlock: '$space$2',
  '@sm': { $$layoutPaddingBlock: '$space$3' },
  '@md': { $$layoutPaddingBlock: '$space$3' },
  '@lg': {
    $$layoutPaddingBlock: '$space$4',

    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },
  '@xl': { $$layoutPaddingBlock: '$space$5' },

  paddingBlock: '$$layoutPaddingBlock',
  responsivePaddingInline: ['$2', '$3', '$3', ['$4', '$0'], ['$5', '$0']],

  position: 'relative',

  // Due to the absolute positioning of [MainLayoutContainer],
  // [S_MainLayout] lost its height, causing the app bar to not stick to the top as intended
  // As a result, the following two properties are applied to address this issue.
  height: '100dvh',
  overflow: 'auto',

  // Page content stretches up to Full HD width
  maxWidth: '120rem',
  marginInline: 'auto',

  // Target the Next.js wrapper
  '*:has(> &)': {
    minWidth: '100vw',
  },
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

    marginBlock: 'calc(-1 * $$layoutPaddingBlock)',
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
