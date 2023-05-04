import { breakpoints } from '@/styles/globals'
import { Box, Text, styled } from '@ignite-ui/react'

export const S_SchedulingForm = styled(Box, {
  display: 'grid',
  gap: '$6',

  maxWidth: '33.75rem',
  padding: '$3',

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$4',
  },

  [`@media (min-width: ${breakpoints.lg})`]: {
    width: '33.75rem',
    padding: '$6',
  },

  '> hr': {
    border: 'none',
    borderBottom: '1px solid $gray600',
  },
})

export const ScheduleInfo = styled('div', {
  display: 'flex',
  gap: '$4',

  '> span': {
    display: 'inline-flex',
    gap: '$2',
    alignItems: 'center',

    [`> ${Text}`]: {
      color: '$white !important',
    },
  },
})

export const Form = styled('form', {
  display: 'grid',
  gap: '$6',

  '> div:last-of-type': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

export const InputField = styled('div', {
  display: 'grid',
  gap: '$2',

  '> label': {
    color: '$white',
  },
})
