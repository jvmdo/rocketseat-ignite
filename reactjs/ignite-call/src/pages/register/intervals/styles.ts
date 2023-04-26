import { breakpoints } from '@/styles/globals'
import { Box, Text, styled } from '@ignite-ui/react'

export const IntervalsOuterBox = styled(Box, {
  display: 'grid',
  gap: '$4',
  padding: '$3',

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$4',
  },

  [`@media (min-width: ${breakpoints.lg})`]: {
    padding: '$6',
  },
})

export const IntervalsInnerBox = styled(Box, {
  padding: 'unset',
})

export const IntervalsItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '$2 $3',

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$3 $4',
  },

  '&:not(:last-of-type)': {
    borderBottom: '1px solid $gray600',
  },

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },

  '> div:first-of-type': {
    flex: 1,
    gap: '$3',

    display: 'inline-flex',

    [`> ${Text}`]: {
      flex: 1,
      fontSize: '$sm',

      [`@media (min-width: ${breakpoints.md})`]: {
        fontSize: '$md',
      },
    },
  },

  // Can't change padding with TextInput, so...
  [`& > div:last-of-type *:has(input)`]: {
    padding: '$2',

    [`@media (min-width: ${breakpoints.md})`]: {
      padding: '$2 $3',
    },

    [`@media (min-width: ${breakpoints.lg})`]: {
      padding: '$3 $4',
    },
  },

  'input::-webkit-calendar-picker-indicator': {
    display: 'none',
    filter: 'invert(100%) brightness(30%)',

    [`@media (min-width: ${breakpoints.sm})`]: {
      display: 'unset',
    },
  },
})
