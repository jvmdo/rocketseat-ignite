import { styled } from '@/styles/stitches.config'

export const S_SignIn = styled('div', {
  container: 'sign / size',

  height: 'min(100dvh, 90rem)',
  maxWidth: '120rem',

  display: 'grid',
  gridAutoRows: 'auto 1fr',
  rowGap: '$10',

  responsivePaddingBlock: ['$2', '$3', '$4', '$5'],
  responsivePaddingInline: ['$2', '$3', '$4', '$5'],

  '@l': {
    rowGap: 'unset',
    gridTemplateColumns: 'max-content 1fr',
    overflow: 'auto',
  },

  // Center on very big screens
  position: 'absolute',
  inset: 0,
  margin: 'auto',
})

export const SignInOptions = styled('main', {
  container: 'options / size',

  height: '100cqh',

  display: 'grid',
  gridAutoRows: 'min-content auto',
  responsiveGap: ['$6', '$7', '$10'],
  justifyContent: 'center',

  '@l': {
    alignContent: 'center',
    responsivePaddingInline: ['$6', '$7', '$8', '$10'],
  },
})

export const HeadingGroup = styled('hgroup', {
  textAlign: 'center',
  width: 'min(84cqw, 23.25rem)',

  h1: {
    color: '$gray100',
    lineHeight: '$short',
    fontWeight: '$bold',
    responsiveFontSize: ['$lg', '$lg', '$lg', '$xl', '$xxl'],
  },

  p: {
    color: '$gray200',
    responsiveFontSize: ['$sm', '$sm', '$sm', '$md', '$md'],
  },

  '@lg': {
    textAlign: 'start',
  },
})

export const ButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$4',
})
