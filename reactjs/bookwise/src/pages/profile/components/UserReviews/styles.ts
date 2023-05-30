import { styled } from '@/styles/stitches.config'

export const S_UserReviews = styled('section', {
  display: 'grid',
  gridAutoRows: 'auto 1fr',
  responsiveGap: ['$6', '$8', '$10'],

  responsiveMarginBlock: [['$4', '$0'], ['$4', '$0'], ['$4', '$0'], '$0'],

  '> ol': {
    display: 'flex',
    flexDirection: 'column',
    responsiveGap: ['$4', '$5', '$6'],

    time: {
      color: '$gray300',
      responsiveFontSize: ['$xs', '$xs', '$sm'],
    },

    '> li': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: '$2',

      ul: {
        display: 'flex',
        flexDirection: 'column',
        responsiveGap: ['$3', '$4', '$5'],
      },
    },
  },
})
