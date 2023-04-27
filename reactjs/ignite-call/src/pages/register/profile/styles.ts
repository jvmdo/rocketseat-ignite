import { Box, TextArea, styled } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  display: 'grid',
  gap: '$4',

  '> :is(.head, .body)': {
    display: 'grid',
    gap: '$2',

    [`${TextArea}`]: {
      minHeight: '7.5rem',
    },
  },

  '> .head': {
    placeItems: 'center',
  },
})
