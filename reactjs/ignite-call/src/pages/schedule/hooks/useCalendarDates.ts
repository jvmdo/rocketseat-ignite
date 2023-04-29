import dayjs from 'dayjs'
import { useMemo } from 'react'

type CalendarDate = {
  date: dayjs.Dayjs
  disabled: boolean
}

type CalendarDates = {
  week: number
  dates: CalendarDate[]
}

type CalendarDatesPerWeek = CalendarDates[]

export function useCalendarDates(currentDate: dayjs.Dayjs) {
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
          disabled: date.endOf('day').isBefore(dayjs()),
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
  }, [currentDate])
}
