import { keyframes, styled } from '@/styles/stitches.config'
import * as Drawer from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const fadeIn = keyframes({
  '0%': { backgroundColor: 'transparent' },
  '100%': { backgroundColor: 'color-mix(in srgb, transparent, $black 60%)' },
})

const fadeOut = keyframes({
  '0%': { backgroundColor: 'color-mix(in srgb, transparent, $black 60%)' },
  '100%': { backgroundColor: 'transparent' },
})

export const DrawerOverlay = styled(Drawer.Overlay, {
  position: 'fixed',
  inset: 0,
  zIndex: 91,

  '&[data-state="open"]': {
    animation: `${fadeIn} $transitions$overlay forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} $transitions$overlay`,
  },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(0%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translateX(-100%) scale(1)' },
})

const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translateX(-100%) scale(1)' },
  '100%': { opacity: 0, transform: 'translateX(0%) scale(.96)' },
})

export const DrawerContent = styled(Drawer.Content, {
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.5)',

  position: 'fixed',
  insetInlineStart: '100%',

  '&[data-state="open"]': {
    animation: `${contentShow} $transitions$content forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${contentHide} $transitions$content`,
  },
})

export const ScrollAreaRoot = styled(ScrollArea.Root, {
  height: '100dvh',
  responsiveWidth: ['84vw', '72.9vw', '64.57vw', '54.86vw', '41.25rem'],

  overflow: 'hidden',
})

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  height: 'inherit',
  width: 'inherit',

  responsivePaddingBlock: ['$6', '$8', ['$12', '$10'], ['$16', '$10']],
  responsivePaddingInline: ['$4', '$6', '$8', '$10', '$12'],

  position: 'relative',

  article: {
    display: 'grid',
    gridAutoRows: 'min-content 1fr',
    responsiveGap: ['$6', '$7', '$8', '$10'],
  },
})

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  backgroundColor: '$gray700',
  width: '6px',
  userSelect: 'none',
  touchAction: 'none',
})

export const ScrollAreaThumb = styled(ScrollArea.Thumb, {
  backgroundColor: '$gray600',
  borderRadius: '$full',
})

export const DrawerCloseButton = styled(Drawer.Close, {
  lineHeight: 0,

  responsivePaddingBlock: ['$1', '$2', ['$4', '$3'], ['$6', '$4']],
  responsivePaddingInline: ['$4', '$6', '$8', '$10', '$12'],

  position: 'absolute',
  insetBlockStart: 0,
  insetInlineEnd: 0,

  svg: {
    responsiveHeight: ['1rem', '1.25rem', '1.5rem'],
    responsiveWidth: ['1rem', '1.25rem', '1.5rem'],

    color: '$gray400',

    transition: 'color $action-in-out',

    '&:is(:hover, :focus-visible)': {
      color: '$gray300',
    },
  },
})
