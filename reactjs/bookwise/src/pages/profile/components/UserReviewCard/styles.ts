import { styled } from '@/styles/stitches.config'

export const S_UserReviewCard = styled('div', {
  backgroundColor: '$gray700',
  borderRadius: '$sm',

  display: 'grid',
  responsiveGap: ['$3', '$4', '$5', '$6'],

  responsivePaddingBlock: ['$3', '$4', '$5', '$6'],
  responsivePaddingInline: ['$3', '$4', '$5', '$6'],
})

export const CardHead = styled('header', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateAreas: `
    'book hgroup'
    'book rating'
  `,
  responsiveGap: ['$3', '$4', '$5', '$6'],
  rowGap: 0,

  img: {
    alignSelf: 'center',
    gridArea: 'book',

    height: 'auto',
    responsiveWidth: ['3.75rem', '5rem', '6.125rem'],
  },

  hgroup: {
    gridArea: 'hgroup',

    h3: {
      color: '$gray100',
      fontWeight: '$bold',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$md', '$md', '$lg'],

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      '@supports (-webkit-line-clamp: 4)': {
        display: '-webkit-box',
        whiteSpace: 'initial',
        '-webkit-line-clamp': 4,
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
})

export const CardBody = styled('div', {
  color: '$gray300',
  responsiveFontSize: ['$xs', '$xs', '$sm'],
})
