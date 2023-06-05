import { styled } from '@/styles/stitches.config'

export const S_ProfileHeader = styled('header', {
  '> *': {
    display: 'flex',
    alignItems: 'center',
    responsiveGap: ['$2', '$2', '$3'],
  },

  h1: {
    color: '$gray100',
    lineHeight: '$short',
    responsiveFontSize: ['$lg', '$lg', '$xl', '$xxl'],

    svg: {
      color: '$green100',
      responsiveHeight: ['1.5rem', '1.75rem', '2rem'],
      responsiveWidth: ['1.5rem', '1.75rem', '2rem'],
    },
  },

  button: {
    borderRadius: '$xs',
    color: '$gray100',
    fontWeight: '$bold',
    lineHeight: '$shorter',
    responsiveFontSize: ['$xs', '$sm', '$lg'],

    marginInlineStart: 'calc(-1 * $2)',
    padding: '$1 $2',

    transition: 'background-color $action-in-out',

    '&:is(:hover, :focus-visible)': {
      backgroundColor: 'color-mix(in srgb, $gray200 4%, transparent)',
    },

    display: 'inline-flex',
    alignItems: 'center',
    responsiveGap: ['$1', '$2', '$3'],

    svg: {
      responsiveHeight: ['1rem', '1rem', '1.25rem'],
      responsiveWidth: ['1rem', '1rem', '1.25rem'],
    },
  },
})
