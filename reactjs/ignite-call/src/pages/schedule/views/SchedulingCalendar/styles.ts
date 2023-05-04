import { breakpoints } from '@/styles/globals'
import { styled } from '@ignite-ui/react'

export const S_SchedulingCalendar = styled('main', {
  display: 'grid',
  gridTemplateRows: 'auto 0',

  [`@media (min-width: ${breakpoints.lg})`]: {
    gridTemplateColumns: '27fr 0fr',
    minHeight: '31.75rem',
    width: '33.75rem',
  },

  transition: 'all 1s cubic-bezier(.2, .95, .4, 1)',

  variants: {
    withPicker: {
      true: {
        gridTemplateRows: 'auto 30rem',
        transitionDuration: '500ms',

        [`@media (min-width: ${breakpoints.lg})`]: {
          gridTemplateRows: 'unset',
          gridTemplateColumns: '27fr 14fr',
          width: '51.25rem',
        },
      },
    },
  },
})
