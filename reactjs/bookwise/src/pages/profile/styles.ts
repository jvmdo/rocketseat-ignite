import { styled } from '@/styles/stitches.config'
import { UserReviews } from './components/UserReviews'
import { UserStats } from './components/UserStats'

export const S_Profile = styled('main', {
  display: 'grid',
  responsiveGap: ['$6', '$8', '$8', '$8', '$10'],

  '> header': {
    display: 'flex',
    alignItems: 'center',
    responsiveGap: ['$2', '$2', '$3'],

    h2: {
      color: '$gray100',
      lineHeight: '$short',
      responsiveFontSize: ['$lg', '$lg', '$xl', '$xxl'],
    },

    svg: {
      color: '$green100',
      responsiveHeight: ['1.5rem', '1.75rem', '2rem'],
      responsiveWidth: ['1.5rem', '1.75rem', '2rem'],
    },

    button: {
      display: 'inline-flex',
      alignItems: 'center',
      responsiveGap: ['$1', '$2', '$3'],

      color: '$gray100',
      fontWeight: '$bold',
      responsiveFontSize: ['$xs', '$sm', '$lg'],

      svg: {
        color: '$gray100',
        responsiveHeight: ['1rem', '1rem', '1.25rem'],
        responsiveWidth: ['1rem', '1rem', '1.25rem'],
      },
    },
  },

  '@lg': {
    gridTemplateColumns: '9fr 5fr',
    gridTemplateAreas: `
      'header    .  '
      'reviews stats'
    `,

    '> header': {
      gridArea: 'header',
    },

    [`${UserReviews}`]: {
      gridArea: 'reviews',
    },

    [`${UserStats}`]: {
      alignSelf: 'start',
      gridArea: 'stats',

      position: 'sticky',
      insetBlockStart: 0,
      // marginBlockStart: 'calc(-1 * ($3 - 1px))', // small alignment fix
    },
  },

  '@xl': {
    columnGap: '$16',
  },

  '@xxl': {
    gridTemplateColumns: 'unset',
  },
})
