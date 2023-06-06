import { keyframes, styled } from '@/styles/stitches.config'
import { Content, Trigger } from '@radix-ui/react-collapsible'

export const S_BookReviews = styled('section', {
  display: 'grid',
  gridAutoRows: 'auto 1fr',
  gap: '$4',

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    h3: {
      color: '$gray200',
      fontWeight: '$regular',
      responsiveFontSize: ['$xs', '$sm'],
    },
  },
})

export const CollapsibleTrigger = styled(Trigger, {
  borderRadius: '$xs',
  color: '$purple100',
  fontWeight: '$bold',
  responsiveFontSize: ['$xs', '$sm', '$md'],

  padding: '$1 $2',

  transition: 'background-color $action-in-out',

  '&:is(:hover, :focus-visible)': {
    backgroundColor: 'color-mix(in srgb, $purple100 6%, transparent)',
  },

  '&[data-state="open"]': {
    display: 'none',
  },

  variants: {
    // * It's like disabled without actually disabling the button
    // * Otherwise the form wouldn't be closed after submit
    blocked: {
      true: {
        color: '$gray600',
        cursor: 'unset',
        pointerEvents: 'none',
      },
    },
  },
})

const slideDown = keyframes({
  from: {
    height: 0,
    transform: 'scale(0.96)',
  },
  to: {
    height: 'var(--radix-collapsible-content-height)',
    transform: 'scale(1)',
  },
})

const slideUp = keyframes({
  from: {
    height: 'var(--radix-collapsible-content-height)',
    transform: 'scale(1)',
  },
  to: {
    height: 0,
    transform: 'scale(0.96)',
  },
})

export const CollapsibleContent = styled(Content, {
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${slideDown} $transitions$collapse`,
  },

  '&[data-state="closed"]': {
    animation: `${slideUp} $transitions$collapse`,
  },
})

export const ReviewCardsList = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})
