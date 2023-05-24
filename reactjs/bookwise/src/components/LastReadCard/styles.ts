import { styled } from '@/styles/stitches.config'

export const S_LastReadCard = styled('div', {
  backgroundColor: '$gray600',
  borderRadius: '$sm',

  responsiveFontSize: ['$xs', '$sm'],

  responsivePaddingBlock: ['$3', '$4', '$5'],
  responsivePaddingInline: ['$4', '$5', '$6'],
  responsiveWidth: ['17.5rem', '22.625rem', '27.75rem', '32.875rem', '38rem'],

  header: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: '$4',

    // Rating
    span: {
      svg: {
        height: '1rem',
        width: '1rem',

        '&:not(:last-of-type)': {
          marginRight: 4,
        },
      },
    },
  },

  hgroup: {
    textTransform: 'capitalize',

    h3: {
      color: '$gray100',
      fontWeight: '$bold',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$sm', '$md'],
    },

    p: {
      color: '$gray400',
    },
  },

  img: {
    display: 'none',
  },

  display: 'grid',
  rowGap: '$2',

  '@sm': {
    responsiveGap: ['$4', '$5', '$6'],
    rowGap: '$3',
    gridTemplateColumns: 'auto 1fr',
    gridAutoRows: 'min-content 1fr auto',
    gridTemplateAreas: `
      'book header'
      'book hgroup'
      'book para'
    `,

    header: {
      gridArea: 'header',
    },

    hgroup: {
      gridArea: 'hgroup',
    },

    img: {
      alignSelf: 'center',
      gridArea: 'book',

      display: 'block',
      height: 'auto',
      width: '6.75rem',
    },

    '> p': {
      alignSelf: 'end',
      gridArea: 'para',
    },
  },

  ':where(h3, p)': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '@supports (-webkit-line-clamp: 2)': {
      display: '-webkit-box',
      whiteSpace: 'initial',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
    },
  },
})
