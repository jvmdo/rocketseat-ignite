import { keyframes, styled } from '@/styles/stitches.config'
import { Trigger } from '@radix-ui/react-collapsible'

export const S_AppBar = styled('header', {
  backgroundColor: '$gray700',
  backgroundImage: 'url("/appbar-bg-mobile.svg")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  borderRadius: '$sm',
  // boxShadow: '0 2px 6px -3px $colors$green100',

  minHeight: '3.5rem',
  responsivePaddingBlock: ['$3', '$4', '$5', ['$10', '$6']],
  responsivePaddingInline: ['$4', '$6', '$6', '$6', '$8'],

  display: 'grid',
  gridTemplateRows: '2rem auto',

  position: 'sticky',
  insetBlockStart: '$$layoutPaddingBlock',
  inlineSize: '100%',
  zIndex: 90,

  '@lg': {
    backgroundImage: 'url("/appbar-bg-desktop.svg")',
    backgroundPosition: 'left top',
    backgroundSize: 'cover',
    borderRadius: '$md',

    insetInlineStart: 0,

    height: 'calc(100dvh - 2 * $$layoutPaddingBlock)',
    width: 'clamp(11.5rem, 4.206rem + 11.76vw, 14.5rem)', // from 992px to 1400px

    justifyItems: 'center',
  },
})

const shrink = keyframes({
  from: { width: '8rem' },
  to: { width: '6rem' },
})

const stretch = keyframes({
  from: { width: '6rem' },
  to: { width: '8rem' },
})

export const StaticContent = styled('div', {
  display: 'flex',
  gap: '$4',
  alignItems: 'center',
  responsiveWidth: ['auto', 'auto', 'auto', '8rem'],

  'img[src*="logo"]': {
    height: 'auto',

    '[data-state="open"] &': {
      animation: `${shrink} $transitions$collapse forwards`,
    },

    '[data-state="closed"] &': {
      animation: `${stretch} $transitions$collapse`,
    },

    '@md': {
      animation: 'unset !important',
    },
  },
})

export const CollapsibleTrigger = styled(Trigger, {
  display: 'var(--display, inline-block)',

  '.lane': {
    transition: 'y $collapse 200ms, rotate $collapse, opacity 0ms 200ms',
    transformOrigin: 'center',
  },

  '&[data-state="open"] .lane': {
    transition: 'y $collapse, rotate $collapse 200ms, opacity 0ms 200ms',
  },

  '&[data-state="open"] :is(.top, .bot)': {
    // Icon must be centralized otherwise these values won't make a cross (X)
    y: '10px',
  },

  '&[data-state="open"] .top': {
    rotate: '45deg',
  },

  '&[data-state="open"] .mid': {
    opacity: 0,
  },

  '&[data-state="open"] .bot': {
    rotate: '-45deg',
  },
})
