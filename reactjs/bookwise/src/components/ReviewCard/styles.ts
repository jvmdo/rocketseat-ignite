import { styled } from '@/styles/stitches.config'

export const S_ReviewCard = styled('div', {
  backgroundColor: '$gray700',
  borderRadius: '$sm',

  responsivePaddingBlock: ['$3', '$4', '$5', '$6'],
  responsivePaddingInline: ['$3', '$4', '$5', '$6'],

  display: 'grid',
  responsiveGap: ['$4', '$5', '$6', '$8'],
})

export const CardHeader = styled('header', {
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  responsiveGap: ['$3', '$3', '$4'],

  '.user-info': {
    display: 'grid',
    alignItems: 'center',
    responsiveGap: ['$3', '$3', '$4'],
    gridTemplateColumns: 'auto 1fr',

    img: {
      background: '$colors$gradient-vertical border-box',
      border: '1px solid transparent',
      borderRadius: '$full',
      responsiveHeight: ['2rem', '2rem', '2.5rem'],
      responsiveWidth: ['2rem', '2rem', '2.5rem'],
    },

    h4: {
      color: '$gray100',
      lineHeight: '$short',
      fontWeight: '$regular',
      responsiveFontSize: ['$sm', '$md'],
    },

    p: {
      color: '$gray400',
      lineHeight: '$shorter',
      responsiveFontSize: ['$xs', '$sm'],
    },
  },

  // The actual Rating wrapper
  span: {
    alignSelf: 'start',

    svg: {
      height: '1rem',
      width: '1rem',

      '&:not(:last-of-type)': {
        marginRight: 4,
      },
    },
  },
})

export const CardBody = styled('div', {
  hgroup: {
    cursor: 'pointer',
    textTransform: 'capitalize',

    h4: {
      color: '$gray100',
      fontWeight: '$bold',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$sm', '$md'],

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

    p: {
      color: '$gray400',
      responsiveFontSize: ['$xs', '$xs', '$sm'],
    },
  },

  '> p': {
    fontSize: '$sm',

    span: {
      cursor: 'pointer',

      color: '$purple100',
      fontWeight: '$bold',

      position: 'relative',
      insetBlockEnd: '0.0625em',

      transition: '$action-in-out',

      '&:is(:hover, :focus-visible)': {
        color: '$green100',
      },

      '&:active': {
        color: '$green200',
      },
    },
  },

  display: 'grid',
  rowGap: '$1',

  '@sm': {
    responsiveGap: ['$4', '$5', '$6'],
    rowGap: '$3',
    gridTemplateColumns: 'auto 1fr',
    gridAutoRows: 'min-content auto 1fr',
    gridTemplateAreas: `
      'book hgroup'
      'book para'
    `,

    hgroup: {
      gridArea: 'hgroup',
    },

    img: {
      alignSelf: 'center',
      gridArea: 'book',

      height: 'auto',
      responsiveWidth: ['4.25rem', '5rem', '5.75rem', '6.75rem'],

      cursor: 'pointer',

      transition: 'transform $action-in-out, box-shadow $action-in-out',

      '&:is(:hover, :focus-visible)': {
        boxShadow: `
          2px 2px 1.5rem -0.75rem $colors$green100, 
          -2px -2px 1.5rem -0.75rem $colors$green100
        `,
      },

      '&.active': {
        transform: 'scale(0.96)',
      },
    },

    '> p': {
      alignSelf: 'end',
      gridArea: 'para',
    },
  },
})
