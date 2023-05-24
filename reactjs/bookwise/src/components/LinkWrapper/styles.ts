import { styled } from '@/styles/stitches.config'
import Link from 'next/link'

export const S_LinkWrapper = styled(Link, {
  display: 'inline-block',

  borderRadius: '$sm',
  outline: 'none !important',

  transition: 'border $action-in-out',

  '&:is(:hover, :focus-visible)': {
    boxShadow: '0 0 0 2px $colors$gray500',
  },
})
