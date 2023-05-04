import { breakpoints } from '@/styles/globals'
import { styled } from '@ignite-ui/react'

export const AppContainer = styled('div', {
  // 540px
  $$baseWidth: '33.75rem',

  /* From 32px to 64px at 320px to 576px  */
  $$fluidBlockPadding: 'clamp(2rem, -0.5rem + 12.5vmax, 4rem)',
  /* From 64px to 96px at 576px to 992px  */
  [`@media (min-height: ${breakpoints.sm})`]: {
    $$fluidBlockPadding: 'clamp(4rem, 1.231rem + 7.69vmax, 6rem)',
  },

  /* From 12px to 24px at 320px to 375px */
  $$fluidInlinePadding: 'clamp(0.75rem, -3.614rem + 21.82vw, 1.5rem)',
  /* From 24px to 48px at 375px to 992px  */
  [`@media (min-width: ${breakpoints.xs})`]: {
    $$fluidInlinePadding: 'clamp(1.5rem, 0.588rem + 3.89vw, 3rem)',
  },

  $$containerGap: '1.5rem',

  display: 'grid',
  gap: '$$containerGap',

  maxWidth: 'calc($$baseWidth + 2 * $$fluidInlinePadding)',
  marginInline: 'auto',
  paddingBlock: '$$fluidBlockPadding',
  paddingInline: '$$fluidInlinePadding',

  transition: '500ms',

  variants: {
    size: {
      landing: {
        [`@media (min-width: ${breakpoints.lg})`]: {
          $$baseWidth: '72.5rem',
          $$fluidInlinePadding: 0,

          minHeight: '100vh',
          overflow: 'hidden',
        },
      },

      large: {
        [`@media (min-width: ${breakpoints.lg})`]: {
          $$baseWidth: '51.25rem',

          justifyContent: 'center',
        },
      },
    },
  },
})
