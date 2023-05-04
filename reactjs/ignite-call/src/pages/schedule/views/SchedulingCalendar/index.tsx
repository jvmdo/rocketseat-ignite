import { Calendar } from '../../components/Calendar'
import { useState } from 'react'
import dayjs from 'dayjs'
import { TimePicker } from '../../components/TimePicker'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { S_SchedulingCalendar } from './styles'

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
