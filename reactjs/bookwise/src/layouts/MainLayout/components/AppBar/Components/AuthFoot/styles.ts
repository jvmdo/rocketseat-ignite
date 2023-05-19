import { styled } from '@/styles/stitches.config'

const FootBase = styled('div', {
  color: '$gray200',

  display: 'inline-flex',
  alignItems: 'center',
  gap: '$3',

  width: '100%',
})

export const UserFoot = styled(FootBase, {
  responsiveFontSize: ['$xs', '$xs', '$sm'],
  paddingInline: '$1',

  img: {
    borderRadius: '50%',
    border: '1px solid lime',

    height: 'auto',
    responsiveWidth: ['1.5rem', '1.75rem', '2rem'],
  },
})

export const SignInFoot = styled(FootBase, {
  borderRadius: '$xs',
  fontWeight: '$bold',
  responsiveFontSize: ['$sm', '$sm', '$md'],
  padding: '$1 $2',

  transition: 'background-color $action-in-out',

  '&:is(:hover, :focus-visible)': {
    backgroundColor: '$gray200-0a',
  },

  svg: {
    color: '$green100',
    responsiveFontSize: ['$md', '$lg', '$xl'],
  },
})

export const SignOutFoot = styled('button', {
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
