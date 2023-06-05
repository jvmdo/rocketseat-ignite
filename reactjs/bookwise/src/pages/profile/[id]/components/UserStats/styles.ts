import { styled } from '@/styles/stitches.config'
import * as Separator from '@radix-ui/react-separator'

export const S_UserStats = styled('aside', {
  display: 'grid',
  gridAutoRows: 'auto min-content 1fr',
  responsiveGap: ['$5', '$6', '$8'],

  '@lg': {
    borderInlineStart: '1px solid $gray700',
    maxWidth: '19.25rem',
  },
})

export const StatsHead = styled('header', {
  placeSelf: 'center',

  display: 'flex',
  alignItems: 'center',
  responsiveGap: ['$3', '$4', '$4', '$5'],

  '@lg': {
    placeSelf: 'unset',

    flexDirection: 'column',
    textAlign: 'center',

    paddingInline: '$4',
  },

  img: {
    background: '$colors$gradient-vertical border-box',
    border: '2px solid transparent',
    borderRadius: '$full',
    responsiveHeight: ['2.5rem', '3rem', '3.5rem ', '4rem', '4.5rem'],
    responsiveWidth: ['2.5rem', '3rem', '3.5rem', '4rem', '4.5rem'],
  },

  hgroup: {
    h2: {
      color: '$gray100',
      lineHeight: '$short',
      responsiveFontSize: ['$md', '$lg', '$lg', '$xl'],
    },

    p: {
      color: '$gray400',
      lineHeight: '$shorter',
      responsiveFontSize: ['$xs', '$sm'],
    },
  },
})

export const StatsSeparator = styled(Separator.Root, {
  placeSelf: 'center',
})

export const StatsBody = styled('ul', {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-around',
  responsiveGap: ['$5', '$6', '$8', '$10'],

  responsivePaddingInline: ['$0', '$0', '$6', '$8', '$10', '$14'],

  '@lg': {
    justifyContent: 'unset',
    responsivePaddingBlock: ['$3', '$4', '$5'],
  },

  li: {
    display: 'grid',
    gridTemplateAreas: `
      'icon strong'
      'para  para '
    `,
    gridAutoColumns: 'auto 1fr',
    placeItems: 'center',
    responsiveGap: ['$3', '$4', '$5'],
    rowGap: '$1',

    svg: {
      gridArea: 'icon',

      color: '$green100',
      responsiveHeight: ['1.25rem', '1.25rem', '1.5rem', '1.5rem', '2rem'],
      responsiveWidth: ['1.25rem', '1.25rem', '1.5rem', '1.5rem', '2rem'],
    },

    strong: {
      gridArea: 'strong',

      color: '$gray200',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$sm', '$md'],
    },

    p: {
      gridArea: 'para',

      color: '$gray300',
      lineHeight: '$shorter',
      responsiveFontSize: ['$xs', '$sm'],
    },

    '@lg': {
      gridTemplateAreas: `
        'icon strong'
        'icon  para '
      `,
      alignItem: 'center',
      justifyItems: 'start',
    },
  },
})
