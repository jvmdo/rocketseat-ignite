import { styled } from '@/styles/stitches.config'

export const S_ReviewCard = styled('div', {
  backgroundColor: '$gray700',
  borderRadius: '$sm',

  responsivePaddingBlock: ['$3', '$4', '$5', '$6'],
  responsivePaddingInline: ['$3', '$4', '$5', '$6'],

  display: 'grid',
  responsiveGap: ['$2', '$3', '$4', '$5'],

  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    responsiveGap: ['$3', '$3', '$4'],

    '.user-info': {
      display: 'grid',
      alignItems: 'center',
      responsiveGap: ['$3', '$3', '$4'],
      gridTemplateColumns: 'auto 1fr',

      img: {
        border: '1px solid $colors$purple100',
        borderRadius: '50%',
        responsiveHeight: ['2rem', '2rem', '2.5rem'],
        responsiveWidth: ['2rem', '2rem', '2.5rem'],
      },

      h4: {
        color: '$gray100',
        lineHeight: '$short',
        responsiveFontSize: ['$sm', '$md'],
      },

      p: {
        color: '$gray400',
        lineHeight: '$shorter',
        responsiveFontSize: ['$xs', '$sm'],
      },
    },

    // The actual Rating wrapper
    span: {
      alignSelf: 'start',

      svg: {
        height: '1rem',
        width: '1rem',

        '&:not(:last-of-type)': {
          marginRight: 4,
        },
      },
    },
  },
})
