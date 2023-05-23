import { keyframes, styled } from '@/styles/stitches.config'
import * as Dialog from '@radix-ui/react-dialog'

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(0%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translateX(-100%) scale(1)' },
})

const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translateX(-100%) scale(1)' },
  '100%': { opacity: 0, transform: 'translateX(0%) scale(.96)' },
})

export const DialogContent = styled(Dialog.Content, {
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

  "&[data-state='open']": {
    animation: `${contentShow} $transitions$content  forwards`,
  },
  "&[data-state='closed']": {
    animation: `${contentHide} $transitions$content  forwards`,
  },

  overflowY: 'auto',

  // More styling in globals.ts file
  scrollbarWidth: 6,

  '&::-webkit-scrollbar': {
    width: 6,
  },
})

export const DialogCloseButton = styled('button', {
  color: '$gray400',
  lineHeight: 0,
  responsiveFontSize: ['$md', '$xl', '$xxl'],

  responsivePaddingBlock: ['$1', '$3', ['$4', '$3'], ['$6', '$4']],
  paddingInline: 'inherit',

  position: 'absolute',
  top: 0,
  right: 0,

  transition: 'all $action-in-out',

  '&:is(:hover, :focus-visible)': {
    svg: {
      color: '$gray300',
    },
  },
})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.6 },
})

const overlayHide = keyframes({
  '0%': { opacity: 0.6 },
  '100%': { opacity: 0 },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: '$black',

  position: 'fixed',
  inset: 0,

  "&[data-state='open']": {
    animation: `${overlayShow} $transitions$overlay`,
  },
  "&[data-state='closed']": {
    animation: `${overlayHide} $transitions$overlay`,
  },
})
