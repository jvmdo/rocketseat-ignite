import { breakpoints } from '@/styles/globals'
import { styled } from '@ignite-ui/react'

export const ContentContainer = styled('div', {
  // 540px
  $$baseWidth: '33.75rem',

  /* From 12px to 24px at 320px to 375px */
  $$fluidPadding: 'clamp(0.75rem, -3.614rem + 21.82vw, 1.5rem)',

  /* From 24px to 48px at 375px to 992px  */
  [`@media (min-width: ${breakpoints.xs})`]: {
    $$fluidPadding: 'clamp(1.5rem, 0.588rem + 3.89vw, 3rem)',
  },

  maxWidth: 'calc($$baseWidth + 2 * $$fluidPadding)',
  marginInline: 'auto',
  paddingInline: '$$fluidPadding',
  paddingBlock: '6rem',

  '@media (orientation: landscape)': {
    paddingBlock: '2rem',

    [`@media (min-height: ${breakpoints.sm})`]: {
      paddingBlock: '4rem',
    },

    [`@media (min-height: ${breakpoints.lg})`]: {
      paddingBlock: '6rem',
    },
  },

  [`@media (orientation: portrait) and (max-height: 40em)`]: {
    paddingBlock: '2rem',
  },
})
