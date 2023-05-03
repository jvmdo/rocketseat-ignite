import { styled } from '@ignite-ui/react'
import { Calendar } from './Calendar'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { TimePicker } from './TimePicker'
import { breakpoints } from '@/styles/globals'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

/* 
  Styles
*/
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

/* 
  Component
*/
export type Times = {
  slots: Array<number>
  available: Array<number>
}

export function SchedulingCalendar() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [times, setTimes] = useState<Times>({
    slots: [],
    available: [],
  })
  const router = useRouter()

  const username = router.query.username as string

  useEffect(() => {
    async function fetchTimes() {
      if (!username || !selectedDate) {
        return
      }

      const date = selectedDate.format('YYYY-MM-DD')

      const response = await api.get(`/users/${username}/availability`, {
        params: { date },
      })

      setTimes({
        slots: response.data.timeSlots,
        available: response.data.availableTimes,
      })
    }

    fetchTimes()
  }, [username, selectedDate])

  return (
    <S_SchedulingCalendar withPicker={Boolean(selectedDate)}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimePicker date={selectedDate} times={times} />
    </S_SchedulingCalendar>
  )
}
