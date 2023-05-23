import { keyframes, styled } from '@/styles/stitches.config'
import * as Dialog from '@radix-ui/react-dialog'

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'scale(.96)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

const contentHide = keyframes({
  '0%': { opacity: 0, transform: 'scale(.96)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray700',
  borderRadius: '$lg',
  boxShadow: '4px 16px 24px rgba(0, 0, 0, 0.25)',

  h2: {
    color: '$gray200',
    fontWeight: '$bold',
    lineHeight: '$short',
    responsiveFontSize: ['$sm', '$sm', '$md'],

    textAlign: 'center',
    responsiveMarginBlock: [
      ['$0', '$2'],
      ['$0', '$4'],
      ['$0', '$6'],
    ],
  },

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  responsiveGap: ['$3', '$3', '$4'],

  height: 'min-content',
  width: 'min(84vw, 32.25rem)',
  responsivePaddingBlock: ['$6', '$8', '$12', '$14'],
  responsivePaddingInline: ['$6', '$10', '$14', '$18'],

  position: 'fixed',
  inset: 0,
  margin: 'auto',

  '&[data-state="open"]': {
    animation: `${contentShow} $transitions$content forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${contentHide} $transitions$content`,
  },
})

export const DialogClose = styled(Dialog.Close, {
  lineHeight: 0,
  responsivePaddingBlock: ['$2', '$3', '$4'],
  responsivePaddingInline: ['$2', '$3', '$4'],

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
  '100%': { backgroundColor: 'color-mix(in srgb, transparent, $black 50%)' },
})

const fadeOut = keyframes({
  '0%': { backgroundColor: 'color-mix(in srgb, transparent, $black 50%)' },
  '100%': { backgroundColor: 'transparent' },
})

export const DialogOverlay = styled(Dialog.Overlay, {
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
