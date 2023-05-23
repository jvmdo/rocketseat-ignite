import { styled } from '@/styles/stitches.config'

export const S_BookDetails = styled('section', {
  backgroundColor: '$gray700',
  borderRadius: '$md',

  display: 'grid',
  responsiveGap: ['$6', '$7', '$8', '$10'],

  responsivePaddingBlock: [
    ['$3', '$2'],
    ['$4', '$3'],
    ['$6', '$4'],
  ],
  responsivePaddingInline: ['$3', '$4', '$6', '$8'],
})

export const Book = styled('div', {
  display: 'grid',
  rowGap: '$3',
  justifyItems: 'center',
  textAlign: 'center',

  responsiveFontSize: ['$sm', '$sm', '$md'],

  hgroup: {
    h2: {
      color: '$gray100',
      lineHeight: '$short',
      fontWeight: '$bold',
      responsiveFontSize: ['$md', '$md', '$lg'],
      responsiveMarginBlock: ['$0', '$0', '$1', ['$1', '$2']],
    },
  },

  '.stars': {
    display: 'flex',
    flexDirection: 'column',

    svg: {
      height: '1.25rem',
      width: '1.25rem',
      responsiveMarginBlock: ['$0', '$0', '$0', '$1'],

      '&:not(:last-of-type)': {
        marginRight: 4,
      },
    },
  },

  '@md': {
    textAlign: 'unset',
    justifyItems: 'unset',

    responsiveGap: ['$4', '$5', '$6', '$8'],
    gridTemplateColumns: 'auto 1fr',
    gridTemplateAreas: `
      'img hgroup'
      'img stars'
    `,

    img: {
      gridArea: 'img',
    },

    hgroup: {
      gridArea: 'hgroup',
    },

    '.stars': {
      gridArea: 'stars',
      alignSelf: 'end',
    },
  },
})

export const About = styled('footer', {
  borderTop: '1px solid $colors$gray600',
  responsivePaddingBlock: ['$3', '$4', '$5', '$6'],

  display: 'flex',
  flexFlow: 'row wrap',
  responsiveGap: ['$4', '$5', '$6'],
  rowGap: '$2', // yeah, overwrite

  '> div': {
    display: 'grid',
    columnGap: '$4',
    justifyContent: 'start',
    gridTemplateAreas: `
      'svg span span'
      'svg strong strong'
    `,

    svg: {
      gridArea: 'svg',
      placeSelf: 'center',

      color: '$green100',
      responsiveHeight: ['1rem', '1.25rem', '1.5rem'],
      responsiveWidth: ['1rem', '1.25rem', '1.5rem'],
    },

    span: {
      gridArea: 'span',
      alignSelf: 'end',

      color: '$gray300',
      responsiveFontSize: ['$xs', '$xs', '$sm'],
    },

    strong: {
      gridArea: 'strong',
      alignSelf: 'start',

      color: '$gray200',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$sm', '$md'],
    },
  },

  '> div:first-of-type': {
    flex: '3 1 12rem',
  },

  '> div:last-of-type': {
    flex: '2 1 6rem',
  },
})
