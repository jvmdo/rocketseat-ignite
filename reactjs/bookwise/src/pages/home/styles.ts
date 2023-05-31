import { styled } from '@/styles/stitches.config'
import { TrendingBooks } from './components/TrendingBooks'
import { RecentBookReviews } from './components/RecentBookReviews'
import { LastReadSection } from './components/LastReadSection'

export const S_Home = styled('main', {
  display: 'grid',
  responsiveGap: ['$5', '$6', '$8', '$8', '$8', '$10'],

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
  },

  '@lg': {
    gridTemplateColumns: '9fr 5fr',
    gridTemplateAreas: `
      'header     .    '
      'reviews trending'
      'reviews trending'
    `,

    '> header': {
      gridArea: 'header',
    },

    [`${TrendingBooks}`]: {
      alignSelf: 'start',
      gridArea: 'trending',

      position: 'sticky',
      insetBlockStart: 0,

      marginBlockStart: 'calc(-1 * $3)', // small alignment fix
    },

    [`${RecentBookReviews}`]: {
      gridArea: 'reviews',
    },
  },

  '@xl': {
    columnGap: '$16',
  },

  '@xxl': {
    gridTemplateColumns: 'unset',
  },

  variants: {
    withReadSection: {
      true: {
        '@lg': {
          gridTemplateAreas: `
            'header       .    '
            'last-read trending'
            'reviews   trending'
          `,

          [`${LastReadSection}`]: {
            gridArea: 'last-read',
          },

          [`${TrendingBooks}`]: {
            marginBlockStart: 'unset',
          },
        },
      },
    },
  },
})
