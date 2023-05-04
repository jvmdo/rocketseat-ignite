import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

type CalendarDate = {
  date: dayjs.Dayjs
  disabled: boolean
}

type CalendarDates = {
  week: number
  dates: CalendarDate[]
}

type CalendarDatesPerWeek = CalendarDates[]

type BusyDates = {
  busy: Array<number>
  unscheduled: Array<number>
}

export function useCalendarDates(currentDate: dayjs.Dayjs) {
  const router = useRouter()
  const [year, month] = currentDate.format('YYYY-MM').split('-')

  const { data: busyDates } = useQuery({
    queryKey: ['busyDates', { year, month }],
    queryFn: async ({ queryKey }) => {
      const username = router.query.username as string
      const { year, month } = queryKey[1] as { year: string; month: string }

      const response = await api.get(`/users/${username}/busy-dates`, {
        params: { year, month },
      })

      const data: BusyDates = {
        busy: response.data.busyDates,
        unscheduled: response.data.unscheduledDates,
      }

      return data
    },
    initialData: {
      busy: [],
      unscheduled: [],
    } as BusyDates,
  })

  return useMemo(() => {
    const datesInMonth = Array.from(
      { length: currentDate.daysInMonth() },
      (_, i) => currentDate.set('date', i + 1),
    )

    const datesInPreviousMonth = Array.from(
      { length: currentDate.startOf('month').get('day') },
      (_, i) => currentDate.startOf('month').subtract(i + 1, 'day'),
    ).reverse()

    const datesInNextMonth = Array.from(
      {
        length: 7 - (currentDate.endOf('month').get('day') + 1),
      },
      (_, i) => currentDate.endOf('month').add(i + 1, 'day'),
    )

    const datesInCalendar = [
      ...datesInPreviousMonth.map(
        (date): CalendarDate => ({
          date,
          disabled: true,
        }),
      ),
      ...datesInMonth.map(
        (date): CalendarDate => ({
          date,
          disabled:
            date.endOf('day').isBefore(dayjs()) ||
            busyDates.unscheduled.includes(date.get('day')) ||
            busyDates.busy.includes(date.get('date')),
        }),
      ),
      ...datesInNextMonth.map(
        (date): CalendarDate => ({
          date,
          disabled: true,
        }),
      ),
    ]

    const calendarDatesPerWeek: CalendarDatesPerWeek = Array.from(
      { length: datesInCalendar.length / 7 },
      (_, i): CalendarDates => ({
        week: i,
        dates: datesInCalendar.slice(i * 7, (i + 1) * 7),
      }),
    )

    return calendarDatesPerWeek
  }, [currentDate, busyDates])
}
