import { breakpoints } from '@/styles/globals'
import { Formatter } from '@/utils/formatter'
import { Box, Text, styled } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState } from 'react'
import { useCalendarDates } from '../hooks/useCalendarDates'

/* 
  Styles
*/
const CalendarBox = styled(Box, {
  display: 'grid',
  maxWidth: '33.75rem',
  padding: '$3',
  zIndex: 1,

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$4',
  },

  [`@media (min-width: ${breakpoints.lg})`]: {
    width: '33.75rem',
    padding: '$6',
  },

  variants: {
    withPicker: {
      true: {
        [`@media (min-width: ${breakpoints.lg})`]: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
  },
})

const CalendarContent = styled('table', {
  display: 'grid',
  gridAutoRows: 'auto 1fr',
})

const CalendarHeader = styled('thead', {
  marginBottom: '$3',

  'tr:first-of-type': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '$6',

    th: {
      display: 'inline-flex',
      gap: '$2',

      strong: {
        color: '$white !important',
        textTransform: 'capitalize',
      },

      button: {
        display: 'inline-flex',
        borderRadius: '$sm',
        padding: '$1',

        '&:hover': {
          backgroundColor: '$gray700',
        },

        '&:active': {
          backgroundColor: '$gray500',
        },

        svg: {
          color: '$gray200',
        },
      },
    },
  },

  'tr:last-of-type': {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '$1',

    textTransform: 'uppercase',

    th: {
      fontWeight: '$medium',

      [`${Text}`]: {
        fontSize: '$xs',

        [`@media (min-width: ${breakpoints.md})`]: {
          fontSize: '$md',
        },
      },
    },
  },
})

const CalendarBody = styled('tbody', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
  justifyContent: 'space-around',

  tr: {
    display: 'flex',
    gap: '$1',

    td: {
      flex: 1,
      display: 'inline-flex',
      justifyContent: 'center',
    },
  },
})

const CalendarDay = styled('button', {
  flex: 1,
  backgroundColor: '$gray600',
  borderRadius: '$sm',
  aspectRatio: '1.15276',

  [`> ${Text}`]: {
    color: '$white !important',
  },

  '&:not(:disabled):is(:hover, :focus-visible)': {
    outline: '2px solid $white',
  },

  '&:disabled': {
    cursor: 'default',
    backgroundColor: 'unset',

    [`> ${Text}`]: {
      color: 'revert !important',
    },
  },

  variants: {
    active: {
      true: {
        position: 'relative',

        '&::before': {
          content: '',
          backgroundColor: '$gray100',
          borderRadius: '100%',
          height: 4,
          width: 4,
          position: 'absolute',
          left: 'calc(50% - 2px)',
          bottom: '18.18%',
        },
      },
    },
  },
})

/* 
  Component
*/
const weekdays = Array.from({ length: 7 }, (_, i) =>
  Formatter.weekdayName(i, true),
)

interface CalendarProps {
  selectedDate: dayjs.Dayjs | null
  setSelectedDate: (date: dayjs.Dayjs | null) => void
}

export function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const calendarDates = useCalendarDates(currentDate)

  function handleNextMonth() {
    setCurrentDate((state) => state.add(1, 'month'))
  }

  function handlePreviousMonth() {
    setCurrentDate((state) => state.subtract(1, 'month'))
  }

  function toggleSelectedDate(date: dayjs.Dayjs) {
    if (date.isSame(selectedDate)) {
      setSelectedDate(null)
    } else {
      setSelectedDate(date)
    }
  }

  return (
    <CalendarBox withPicker={Boolean(selectedDate)}>
      <CalendarContent>
        <CalendarHeader>
          <tr>
            <th>
              <Text as="strong">{currentDate.format('MMMM')}</Text>
              <Text as="span">{currentDate.format('YYYY')}</Text>
            </th>
            <th>
              <button onClick={handlePreviousMonth}>
                <CaretLeft size={20} />
              </button>
              <button onClick={handleNextMonth}>
                <CaretRight size={20} />
              </button>
            </th>
          </tr>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday}>
                <Text as="span">{weekday}</Text>
              </th>
            ))}
          </tr>
        </CalendarHeader>
        <CalendarBody>
          {calendarDates.map(({ week, dates }) => (
            <tr key={week}>
              {dates.map(({ date, disabled }) => (
                <td key={date.unix()}>
                  <CalendarDay
                    disabled={disabled}
                    active={date.isSame(selectedDate)}
                    onClick={() => toggleSelectedDate(date)}
                  >
                    <Text as="span">{date.date()}</Text>
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </CalendarBody>
      </CalendarContent>
    </CalendarBox>
  )
}
