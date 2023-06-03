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
      'last-read trending'
      'reviews trending'
    `,

    '> header': {
      gridArea: 'header',
    },

    [`${LastReadSection}`]: {
      gridArea: 'last-read',

      // ? If this component is displayed, the following margins offset the negative margins
      // ? from [RecentBookReviews], effectively behaving as if they were the grid's `row-gap`.
      responsiveMarginBlock: ['$5', '$6', '$8', '$8', '$8', '$10'],
      marginBlockStart: 0,
    },

    [`${TrendingBooks}`]: {
      gridArea: 'trending',

      alignSelf: 'start',
      position: 'sticky',
      insetBlockStart: 0,
    },

    [`${RecentBookReviews}`]: {
      gridArea: 'reviews',

      // ? [LastReadSection] may or may not be displayed, but its gap is consistently present due to
      // ? the `grid-template-areas`. The following margins overlap and ignore that `row-gap`.
      responsiveMarginBlock: ['-1', '$5', '$6', '$8', '$8', '$8', '$10'],
      marginBlockEnd: 0,
    },
  },

  '@xl': {
    columnGap: '$16',
  },

  '@xxl': {
    gridTemplateColumns: 'unset',
  },
})
