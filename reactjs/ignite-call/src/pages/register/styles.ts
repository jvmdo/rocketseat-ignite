import { Box, styled } from '@ignite-ui/react'

export const S_Register = styled('main', {})

export const RegistrationBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '> div': {
    label: {
      display: 'inline-block',
      fontSize: '$sm',
      marginBottom: '$2',
    },
  },
})
