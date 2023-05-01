import { breakpoints } from '@/styles/globals'
import { Box, Text, styled } from '@ignite-ui/react'
import dayjs from 'dayjs'

/* 
  Styles
*/
const S_TimePicker = styled(Box, {
  borderTop: 'none',
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,

  display: 'grid',
  gridAutoRows: 'min-content 1fr',
  gap: '$3',

  width: '17.5rem',
  overflow: 'auto',
  scrollbarWidth: 'none' /* Hide the scrollbar in Firefox */,
  '&::-webkit-scrollbar': {
    display: 'none' /* Hide the scrollbar in Chrome, Edge and Safari */,
  },

  marginInline: 'auto',
  padding: '$3',

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$4',
  },

  [`@media (min-width: ${breakpoints.lg})`]: {
    borderTop: '1px solid $gray600',
    borderTopRightRadius: '$sm',
    borderBottomLeftRadius: 0,

    height: '31.75rem',
    width: 'auto',

    marginInline: 'unset',
    padding: 'unset',
  },

  opacity: 0,
  transition: 'opacity 1s cubic-bezier(.2, .95, .4, 1)',

  variants: {
    active: {
      true: {
        opacity: 1,
        transitionDuration: '500ms',

        [`@media (min-width: ${breakpoints.lg})`]: {
          padding: '$6',
        },
      },
    },
  },
})

const Head = styled('div', {
  textTransform: 'capitalize',

  '> strong': {
    color: '$white !important',
  },
})

const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const Time = styled('button', {
  flex: 1,
  maxHeight: '25%',
  padding: '$2',

  backgroundColor: '$gray600',
  borderRadius: '$sm',
  textAlign: 'center',

  '&:not(:disabled):is(:hover, :focus-visible)': {
    outline: '2px solid $white',
  },

  '&:disabled': {
    backgroundColor: '$gray700',

    [`> ${Text}`]: {
      color: '$gray300 !important',
    },
  },

  [`> ${Text}`]: {
    color: '$white !important',
  },
})

/* 
  Component
*/
export type Times = {
  available: Array<number>
  busy: Array<number>
}

interface TimePickerProps {
  date: dayjs.Dayjs | null
  times: Times
}

export function TimePicker({ date, times }: TimePickerProps) {
  return (
    <S_TimePicker active={Boolean(date)}>
      {date && (
        <>
          <Head>
            <Text as="strong">{date.format('dddd')}</Text>
            <Text as="span">{`, ${date.format('DD')} ${date.format(
              'MMMM',
            )}`}</Text>
          </Head>
          <Body>
            {times.available.map((time) => (
              <Time key={time}>
                <Text as="span">{`${time}h00`}</Text>
              </Time>
            ))}
          </Body>
        </>
      )}
    </S_TimePicker>
  )
}
