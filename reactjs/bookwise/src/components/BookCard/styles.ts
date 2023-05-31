import { styled } from '@/styles/stitches.config'

export const S_BookCard = styled('div', {
  backgroundColor: '$gray700',
  border: '2px solid transparent',
  borderRadius: '$sm',
  cursor: 'pointer',

  transition: 'border-color $action-in-out',

  '&:is(:hover, :focus-visible)': {
    borderColor: '$gray600',
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
    width: '4.25rem',
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

  responsivePaddingBlock: ['$2', '$2', '$3', '$4'],
  responsivePaddingInline: ['$3', '$3', '$4', '$5'],

  position: 'relative',

  variants: {
    size: {
      big: {
        img: {
          responsiveWidth: ['5.5rem', '6.75rem'],
        },

        hgroup: {
          h4: { '-webkit-line-clamp': 4 },
        },
      },
    },
  },
})

export const ReadTag = styled('i', {
  backgroundColor: '$green300',
  borderTopRightRadius: 'inherit',
  borderBottomLeftRadius: '$xs',

  color: '$green100',
  lineHeight: '$shorter',
  fontSize: '$xs',
  fontStyle: 'normal',
  fontWeight: '$bold',
  textTransform: 'uppercase',

  paddingBlock: '$1',
  responsivePaddingInline: ['$2', '$2', '$3'],

  position: 'absolute',
  insetBlockStart: '-2px', // card border
  insetInlineEnd: '-2px',
})
