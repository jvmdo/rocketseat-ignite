import { styled } from '@/styles/stitches.config'

export const S_BookCard = styled('div', {
  backgroundColor: '$gray700',
  borderRadius: '$sm',
  cursor: 'pointer',
  outline: '2px solid transparent',

  transition: 'outline-color $action-in-out',

  '&:is(:hover, :focus-visible)': {
    outlineColor: '$gray600',
  },

  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateAreas: `
    'book hgroup'
    'book rating'
  `,
  responsiveGap: ['$3', '$4', '$5'],
  rowGap: 0,

  img: {
    alignSelf: 'center',
    gridArea: 'book',

    height: 'auto',
    width: '4rem',
  },

  hgroup: {
    gridArea: 'hgroup',

    h4: {
      color: '$gray100',
      fontWeight: '$bold',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$sm', '$md'],

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      '@supports (-webkit-line-clamp: 2)': {
        display: '-webkit-box',
        whiteSpace: 'initial',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
      },
    },

    p: {
      color: '$gray400',
      responsiveFontSize: ['$xs', '$xs', '$sm'],
    },

    responsiveWidth: ['10rem', '11.125rem', '12.25rem'],
  },

  // Stars wrapper
  span: {
    alignSelf: 'end',
    gridArea: 'rating',

    svg: {
      verticalAlign: 'bottom',

      responsiveHeight: ['$sm', '$sm', '$md'],
      responsiveWidth: ['$sm', '$sm', '$md'],

      '&:not(:last-of-type)': {
        marginRight: 4,
      },
    },
  },

  responsivePaddingBlock: ['$2', '$3', '$4'],
  responsivePaddingInline: ['$3', '$4', '$5'],

  variants: {
    size: {
      big: {
        img: {
          responsiveWidth: ['5.5rem', '6.75rem'],
        },

        hgroup: {
          responsiveWidth: ['7.4173rem', '8.3575rem', '9.4169rem'],
        },
      },
    },
  },
})
