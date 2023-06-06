import { styled } from '@/styles/stitches.config'
import Link from 'next/link'

export const S_LinkWrapper = styled(Link, {
  display: 'block',
  width: 'fit-content',

  borderRadius: '$sm',
  outline: 'none !important',

  transition: 'box-shadow $action-in-out',

  '&:is(:hover, :focus-visible)': {
    boxShadow: '0 0 0 2px $colors$gray500',
  },

  variants: {
    size: {
      round: {
        borderRadius: '50%',
      },
    },
    type: {
      text: {
        borderRadius: 'unset',

        '&:is(:hover, :focus-visible)': {
          boxShadow: '0 1px 0 0 $colors$gray500',
        },
      },
    },
  },
})
