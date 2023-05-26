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
  // Otherwise, card's `outline` would be trimmed
  paddingBlock: 2,
  // "Overflow" parent effect
  paddingInline: '$$containerPaddingInline',

  scrollSnapType: 'both mandatory',

  ol: {
    display: 'flex',
    responsiveGap: ['$3', '$4', '$5'],

    li: {
      flex: '1 0 auto',
      scrollSnapAlign: 'center',

      // Align last carrousel item
      '&:last-of-type': {
        paddingInlineEnd: '$$containerPaddingInline',
      },
    },
  },

  '@lg': {
    maxHeight: '92dvh',
    paddingInline: 2,

    ol: {
      flexDirection: 'column',
      gap: '$3',

      'li:last-of-type': {
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
