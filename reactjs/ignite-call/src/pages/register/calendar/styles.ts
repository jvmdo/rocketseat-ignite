import { breakpoints } from '@/styles/globals'
import { Box, styled } from '@ignite-ui/react'

export const S_Calendar = styled('main', {})

export const CalendarConnectionBox = styled(Box, {
  display: 'grid',
  gap: '$4',
  padding: '$3',

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$4',
  },

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$6',
  },

  [`> ${Box}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '$2 $3',

    [`@media (min-width: ${breakpoints.md})`]: {
      padding: '$3 $4',
    },

    [`@media (min-width: ${breakpoints.md})`]: {
      padding: '$4 $6',
    },
  },
})
