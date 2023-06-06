import { styled } from '@/styles/stitches.config'

export const S_Hero = styled('div', {
  marginInline: 'auto',

  '.image--mobile': {
    height: 'auto',
  },

  '.image--desktop': {
    display: 'none',
  },

  '@l': {
    '.image--desktop': {
      display: 'block',

      height: '100cqh',
      width: 'auto',
    },

    '.image--mobile': {
      display: 'none',
    },
  },
})
