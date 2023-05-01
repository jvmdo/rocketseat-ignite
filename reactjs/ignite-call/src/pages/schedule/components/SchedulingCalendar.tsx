import { styled } from '@ignite-ui/react'
import { Calendar } from './Calendar'
import { useState } from 'react'
import dayjs from 'dayjs'
import { TimePicker, Times } from './TimePicker'
import { breakpoints } from '@/styles/globals'

const S_SchedulingCalendar = styled('main', {
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

export function SchedulingCalendar() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)

  const times: Times = {
    available: [9, 10, 11, 12, 13, 14, 15, 16],
    busy: [8, 12, 17],
  }

  return (
    <S_SchedulingCalendar withPicker={Boolean(selectedDate)}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimePicker date={selectedDate} times={times} />
    </S_SchedulingCalendar>
  )
}
