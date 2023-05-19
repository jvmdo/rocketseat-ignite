import { styled } from '@/styles/stitches.config'
import { Link } from '@radix-ui/react-navigation-menu'

export const S_NavLink = styled(Link, {
  color: '$gray400',
  fontWeight: '$bold',
  responsiveFontSize: ['$sm', '$sm', '$md'],

  display: 'inline-flex',
  alignItems: 'center',
  responsiveGap: ['$2', '$2', '$2', '$3'],
  paddingInline: '$1',
  width: '100%',

  '&:is(:hover, :focus-visible)': {
    color: '$gray100',
  },

  '&[data-active]': {
    color: '$gray200',
    position: 'relative',

    '&::before': {
      content: 'url("/stick.svg")',
      position: 'absolute',
      insetBlock: 0,
      insetInlineStart: '-1rem',
    },
  },

  svg: {
    responsiveFontSize: ['$xl', '$xl', '$xl', '$xxl'],
  },
})
