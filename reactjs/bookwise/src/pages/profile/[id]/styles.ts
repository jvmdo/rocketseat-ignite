import { styled } from '@/styles/stitches.config'
import { UserReviews } from './components/UserReviews'
import { UserStats } from './components/UserStats'
import { ProfileHeader } from './components/ProfileHeader'

export const S_Profile = styled('main', {
  display: 'grid',
  responsiveGap: ['$6', '$8', '$8', '$8', '$10'],

  '@lg': {
    gridTemplateColumns: '9fr 5fr',
    gridTemplateAreas: `
      'header    .  '
      'reviews stats'
    `,

    [`${ProfileHeader}`]: {
      gridArea: 'header',
    },

    [`${UserReviews}`]: {
      gridArea: 'reviews',
    },

    [`${UserStats}`]: {
      gridArea: 'stats',

      alignSelf: 'start',
      position: 'sticky',
      insetBlockStart: '$$layoutPaddingBlock',
    },
  },

  '@xl': {
    columnGap: '$16',
  },

  '@xxl': {
    gridTemplateColumns: '1fr auto',
  },
})
