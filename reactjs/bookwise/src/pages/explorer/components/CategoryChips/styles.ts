import { keyframes, styled } from '@/styles/stitches.config'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

const pong = keyframes({
  '0%': {
    transform: 'translateX(0%)',
  },
  '50%': {
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(0%)',
  },
})

export const S_CategoryChips = styled(ToggleGroup.Root, {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  responsiveGap: ['$2', '$2', '$3'],

  '@md': { justifyContent: 'flex-start' },

  variants: {
    withLoadingBar: {
      true: {
        marginInline: 'auto',
        padding: '1px',
        width: '50vw',

        position: 'relative',

        '&::before': {
          content: '',

          background: '$colors$gradient-horizontal border-box',
          borderRadius: '$md',

          padding: '1px',
          width: '25vw',

          position: 'absolute',
          inset: 0,

          animation: `${pong} 1s $transitions$content infinite`,
        },
      },
    },
  },
})

export const ToggleChip = styled(ToggleGroup.Item, {
  borderRadius: '$full',
  border: '1px solid $colors$purple100',

  color: '$purple100',
  lineHeight: 1,
  responsiveFontSize: ['$xs', '$sm', '$md'],

  padding: '$1 $4',

  transition: 'all $action-in-out',

  '&:is(:hover, :focus-visible)': {
    backgroundColor: '$purple200',
    borderColor: '$purple100',
    color: '$gray100',
  },

  '&[data-state=on]': {
    backgroundColor: '$purple200',
    borderColor: '$purple200',
    color: '$gray100',
  },
})
