import { styled } from '@/styles/stitches.config'
import { SearchField } from '../../components/SearchField'
import { BooksGallery } from './components/BooksGallery'

export const S_Explorer = styled('main', {
  display: 'grid',
  responsiveGap: ['$5', '$6', '$6', '$8', '$10'],

  '> header': {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$4 $6',

    hgroup: {
      display: 'inline-flex',
      alignItems: 'center',
      responsiveGap: ['$2', '$2', '$3'],

      h1: {
        color: '$gray100',
        lineHeight: '$short',
        responsiveFontSize: ['$lg', '$lg', '$xl', '$xxl'],
      },

      svg: {
        color: '$green100',
        responsiveHeight: ['1.5rem', '1.75rem', '2rem'],
        responsiveWidth: ['1.5rem', '1.75rem', '2rem'],
      },

      flex: '1 0 10rem',
    },

    [`${SearchField}`]: {
      flex: '1 0 auto',
      maxWidth: '24rem',
      '@md': { maxWidth: '27.065rem' },
    },
  },

  [`${BooksGallery}`]: {
    responsiveMarginBlock: [
      ['$1', '$0'],
      ['$1', '$0'],
      ['$2', '$0'],
    ],
  },
})
