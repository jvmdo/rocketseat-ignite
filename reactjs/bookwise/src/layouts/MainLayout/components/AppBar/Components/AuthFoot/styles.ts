import { styled } from '@/styles/stitches.config'

const FootBase = styled('div', {
  color: '$gray200',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '$3',

  // See NavBar/styles.ts
  transition: 'opacity $collapse',

  /* Help prevent overflow of long names */
  wordBreak: 'break-word',
  /* Optional, not supported for all languages */
  hyphens: 'auto',

  // Must match AppBar/styles.ts
  responsivePaddingBlock: ['$3', '$4', '$6', ['$10', '$6']],
  responsivePaddingInline: ['$4', '$6', '$6', '$6', '$8'],

  position: 'absolute',
  insetBlock: '0 auto',
  insetInline: '50% 0',

  '@lg': {
    justifyContent: 'center',

    insetBlock: 'auto 0',
    insetInline: '$4 $4',
  },

  marginBlockStart: '0.25rem', // small alignment fix
  '@md': { marginBlockStart: '-0.5rem' },
})

export const UserFoot = styled(FootBase, {
  responsiveFontSize: ['$xs', '$xs', '$sm'],

  img: {
    flexShrink: 0,

    background: '$colors$gradient-vertical border-box',
    border: '1px solid transparent',
    borderRadius: '$full',

    height: 'auto',
    responsiveWidth: ['1.5rem', '1.75rem', '2rem'],
  },

  span: {
    overflow: 'hidden',

    maxHeight: '2.75rem',
    '@md': { minWidth: '2.5rem' },

    lineHeight: '$shorter',
    textTransform: 'capitalize',
  },
})

export const SignInFoot = styled(FootBase, {
  button: {
    flexShrink: 0,

    display: 'inline-flex',
    alignItems: 'center',
    gap: '$3',

    borderRadius: '$xs',
    color: '$gray200',
    fontWeight: '$bold',
    responsiveFontSize: ['$sm', '$sm', '$md'],

    padding: '$1 $2',

    transition: 'background-color $action-in-out',

    '&:is(:hover, :focus-visible)': {
      backgroundColor: '$gray200-0a',
    },
  },

  svg: {
    color: '$green100',

    responsiveHeight: ['1rem', '1.25rem', '1.5rem'],
    responsiveWidth: ['1rem', '1.25rem', '1.5rem'],
  },
})

export const SignOutFoot = styled('button', {
  flexShrink: 0,

  borderRadius: '$xs',
  color: '$danger',
  lineHeight: 0,
  responsiveFontSize: ['$md', '$lg', '$xl'],

  padding: '$1',
  transition: 'background-color $action-in-out',

  '&:is(:hover, :focus-visible)': {
    backgroundColor: '$gray200-0a',
  },
})
