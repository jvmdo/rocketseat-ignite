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
  // marginInline: -24, // Should be calc(-1 * $$layoutPaddingInline)
})

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  paddingBlock: 2, // Otherwise, card's `outline` would be trimmed
  // paddingInline: 24, // Should be $$layoutPaddingInline

  scrollSnapType: 'both mandatory',

  ol: {
    display: 'flex',
    responsiveGap: ['$3', '$4', '$5'],

    li: {
      flex: '1 0 auto',
      scrollSnapAlign: 'center',
    },
  },

  '@lg': {
    maxHeight: '84dvh',
    paddingInline: 2,

    ol: {
      flexDirection: 'column',
      gap: '$3',
    },
  },
})

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
})
