import { styled } from '@/styles/stitches.config'
import Link from 'next/link'

export const S_PageLink = styled(Link, {
  display: 'inline-flex',
  alignItems: 'center',
  responsiveGap: ['$2', '$3'],

  borderRadius: '$xs',
  padding: '$1 $2',

  fontWeight: '$bold',
  responsiveFontSize: ['$xs', '$sm'],

  svg: {
    responsiveHeight: ['1rem', '1.25rem'],
    responsiveWidth: ['1rem', '1.25rem'],
  },

  '&:is(:hover, :focus-visible)': {
    backgroundColor: 'color-mix(in srgb, $gray200 4%, transparent)',
  },

  variants: {
    color: {
      purple: {
        color: '$purple100',

        '&:is(:hover, :focus-visible)': {
          backgroundColor: 'color-mix(in srgb, $purple100 6%, transparent)',
        },
      },
    },
  },
})
