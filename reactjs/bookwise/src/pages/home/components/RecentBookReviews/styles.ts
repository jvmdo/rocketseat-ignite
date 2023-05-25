import { styled } from '@/styles/stitches.config'

export const S_RecentBookReviews = styled('section', {
  display: 'grid',
  responsiveGap: ['$2', '$2', '$3'],

  header: {
    h3: {
      color: '$gray100',
      fontWeight: '$regular',
      lineHeight: '$base',
      responsiveFontSize: ['$xs', '$sm'],
    },
  },

  ol: {
    display: 'flex',
    flexDirection: 'column',
    responsiveGap: ['$2', '$2', '$3'],
  },
})
