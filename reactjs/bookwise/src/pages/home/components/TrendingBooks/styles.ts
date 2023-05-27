import { BookCard } from '@/components/BookCard'
import { styled } from '@/styles/stitches.config'
import * as ScrollArea from '@radix-ui/react-scroll-area'

export const S_TrendingBooks = styled('aside', {
  display: 'grid',
  gridAutoRows: 'min-content 1fr',
  responsiveGap: ['$2', '$2', '$3'],

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$5',

    h3: {
      color: '$gray100',
      fontWeight: '$regular',
      lineHeight: '$base',
      responsiveFontSize: ['$xs', '$sm'],
    },
  },
})

export const ScrollAreaRoot = styled(ScrollArea.Root, {
  overflow: 'auto',

  marginInline: 'calc(-1 * $$containerPaddingInline)',
  '@lg': { marginInline: 'unset' },
})

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  paddingBlock: 'unset',
  // "Overflow" parent effect
  paddingInline: '$$containerPaddingInline',

  scrollSnapType: 'both mandatory',

  ol: {
    display: 'flex',
    responsiveGap: ['$3', '$4', '$5'],

    li: {
      $$maxWidth: '16.75rem',
      '@sm': { $$maxWidth: '17.75rem' },
      '@md': { $$maxWidth: '18.75rem' },
      '@lg': { $$maxWidth: 'max(19.50rem, 100%)' },
      '@xxl': { $$maxWidth: 'unset', width: '20.25rem' },

      flex: '1 0 100%',
      maxWidth: '$$maxWidth',

      scrollSnapAlign: 'center',

      // Align last carrousel item
      '&:last-of-type': {
        maxWidth: 'calc($$maxWidth + $$containerPaddingInline)',
        paddingInlineEnd: '$$containerPaddingInline',
      },

      [`${BookCard}`]: {
        height: '100%',
      },
    },
  },

  '@lg': {
    maxHeight: '92dvh',
    paddingInline: 'unset',

    ol: {
      flexDirection: 'column',
      gap: '$3',

      'li:last-of-type': {
        maxWidth: '$$maxWidth',
        paddingInlineEnd: 'unset',
      },
    },
  },
})

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
})
