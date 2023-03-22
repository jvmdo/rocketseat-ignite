import { styled } from '@/styles/stitches.config'

export const ContentContainer = styled('div', {
  $$fluidPadding: 'clamp(0.75rem, -0.681rem + 6.11vw, 2.25rem)',

  height: '100%',
  maxWidth: 'calc(43.5rem + 2 * $$fluidPadding)',
  marginInline: 'auto',
  paddingInline: '$$fluidPadding',

  '@media(min-width: 48em)': {
    $$fluidPadding: 'clamp(2.25rem, -4.893rem + 14.88vw, 8.5rem)',
    maxWidth: 'calc(73rem + 2 * $$fluidPadding)',
  },

  '@media(min-width: 96em)': {
    $$fluidPadding: 'calc(5rem + 5vw)',
    maxWidth: 'unset',
    minWidth: 'calc(90rem + 2 * $$fluidPadding)',
  },
})
