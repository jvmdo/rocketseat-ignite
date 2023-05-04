import { styled } from '@ignite-ui/react'
import { Calendar } from './Calendar'
import { useState } from 'react'
import dayjs from 'dayjs'
import { TimePicker } from './TimePicker'
import { breakpoints } from '@/styles/globals'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

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

interface SchedulingCalendarProps {
  setScheduleDate: (date: dayjs.Dayjs) => void
}

export function SchedulingCalendar({
  setScheduleDate,
}: SchedulingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const router = useRouter()

  const date = selectedDate?.format('YYYY-MM-DD')

  const { data: times } = useQuery({
    queryKey: ['times', { date }],
    queryFn: async ({ queryKey }) => {
      const username = router.query.username as string
      const [, { date }] = queryKey as [string, { date: string | undefined }]

      const response = await api.get(`/users/${username}/availability`, {
        params: { date },
      })

      const data: Times = {
        slots: response.data.timeSlots,
        available: response.data.availableTimes,
      }

      return data
    },
    enabled: Boolean(selectedDate),
    initialData: {
      slots: [],
      available: [],
    } as Times,
  })

  function setDateHour(time: number) {
    const scheduleDate = dayjs(selectedDate).startOf('hour').set('hour', time)
    setScheduleDate(scheduleDate)
  }

  return (
    <S_SchedulingCalendar withPicker={Boolean(selectedDate)}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimePicker date={selectedDate} times={times} setDateHour={setDateHour} />
    </S_SchedulingCalendar>
  )
}
