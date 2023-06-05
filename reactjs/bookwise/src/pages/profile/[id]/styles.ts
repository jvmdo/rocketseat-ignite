import { styled } from '@/styles/stitches.config'
import { UserReviews } from './components/UserReviews'
import { UserStats } from './components/UserStats'

export const S_Profile = styled('main', {
  display: 'grid',
  responsiveGap: ['$6', '$8', '$8', '$8', '$10'],

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
