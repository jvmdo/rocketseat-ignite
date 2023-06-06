import { styled } from '@/styles/stitches.config'

export const S_Hero = styled('div', {
  marginInline: 'auto',

  '.image--mobile': {
    height: 'auto',
  },

  '@l': {
    '.image--desktop': {
      height: '100cqh',
      width: 'auto',
    },
  },
})
