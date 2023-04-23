import { ContentContainer } from '@/components/ContentContainer'
import { breakpoints } from '@/styles/globals'
import { Box, styled } from '@ignite-ui/react'

export const S_Register = styled('main', {
  [`> ${ContentContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',

    [`>:not(${Box})`]: {
      paddingInline: '$3',
    },

    [`@media (min-width: ${breakpoints.md})`]: {
      [`>:not(${Box})`]: {
        paddingInline: '$4',
      },
    },

    [`@media (min-width: ${breakpoints.lg})`]: {
      [`>:not(${Box})`]: {
        paddingInline: '$6',
      },
    },
  },
})

export const S_Box = styled(Box, {
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
