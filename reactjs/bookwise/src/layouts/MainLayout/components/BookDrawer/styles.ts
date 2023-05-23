import { keyframes, styled } from '@/styles/stitches.config'
import * as Drawer from '@radix-ui/react-dialog'

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

  responsivePaddingBlock: ['$6', '$8', ['$12', '$10'], ['$16', '$10']],
  responsivePaddingInline: ['$4', '$6', '$8', '$10', '$12'],

  height: '100dvh',
  responsiveWidth: ['84vw', '72.9vw', '64.57vw', '54.86vw', '41.25rem'],

  display: 'grid',
  gridAutoRows: 'min-content 1fr',
  responsiveGap: ['$6', '$7', '$8', '$10'],

  position: 'fixed',
  left: '100%',

  '&[data-state="open"]': {
    animation: `${contentShow} $transitions$content forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${contentHide} $transitions$content`,
  },

  overflowY: 'auto',

  // More styling in globals.ts file
  scrollbarWidth: 6,

  '&::-webkit-scrollbar': {
    width: 6,
  },
})

export const DrawerCloseButton = styled(Drawer.Close, {
  lineHeight: 0,
  responsivePaddingBlock: ['$1', '$3', ['$4', '$3'], ['$6', '$4']],
  paddingInline: 'inherit',

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
  zIndex: -1,

  '&[data-state="open"]': {
    animation: `${fadeIn} $transitions$overlay forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} $transitions$overlay`,
  },
})
