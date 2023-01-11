import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  HomeContainer,
  StartButton,
  StopButton,
  TaskInput,
  TimeInput,
} from './styles'
import { useEffect, useState } from 'react'

export function Home() {
  const timerFormDataSchema = zod.object({
    task: zod
      .string()
      .trim()
      .min(1, { message: 'Task name must be at least one character long' }),
    minutes: zod
      .number({
        invalid_type_error: 'Duration must be a integer between 5 and 60',
      })
      .int()
      .gte(1)
      .lte(60),
  })

  type timerFormData = zod.infer<typeof timerFormDataSchema>

  const { register, handleSubmit, watch, reset, formState } =
    useForm<timerFormData>({
      resolver: zodResolver(timerFormDataSchema),
      defaultValues: {
        task: '',
        minutes: 5,
      },
    })

  const isTaskFieldValid = !watch('task')
  console.log('Form errors:', formState.errors)

  interface Timer {
    id: string
    task: string
    minutes: number
    startAt: number
    interruptedAt?: number
    finishedAt?: number
  }

  const [timers, setTimers] = useState<Timer[]>([])
  const [activeTimerId, setActiveTimerId] = useState<string | null>()
  const [secondsLeftToEnd, setSecondsLeftToEnd] = useState(0)

  function handleCreateTimer(data: timerFormData) {
    const newTimer: Timer = {
      id: crypto.randomUUID(),
      task: data.task,
      minutes: data.minutes,
      startAt: Date.now() / 1000,
    }

    setTimers((state) => [newTimer, ...state])
    setActiveTimerId(newTimer.id)

    reset()
  }

  const currentActiveTimer = timers.find(({ id }) => id === activeTimerId)

  useEffect(() => {
    let differenceInSeconds: number, countdown: number

    if (currentActiveTimer) {
      const endAt = currentActiveTimer.startAt + currentActiveTimer.minutes * 60

      // It takes 1s until the first setInterval's callback execution
      // This makes the countdown render immediately
      differenceInSeconds = Math.round(endAt - currentActiveTimer.startAt)
      setSecondsLeftToEnd(differenceInSeconds)

      countdown = setInterval(() => {
        differenceInSeconds = Math.round(endAt - Date.now() / 1000)
        setSecondsLeftToEnd(differenceInSeconds)

        if (differenceInSeconds <= 0) {
          setTimers((state) =>
            state.map((timer) => {
              if (timer.id === activeTimerId) {
                timer.finishedAt = Date.now()
              }
              return timer
            }),
          )
          setActiveTimerId(null)
          setSecondsLeftToEnd(0)
        }
      }, 1000)
    }

    return () => clearInterval(countdown)
  }, [currentActiveTimer, activeTimerId])

  const activeTimerSeconds = activeTimerId ? secondsLeftToEnd : 0

  const minutesCountdown = Math.floor(activeTimerSeconds / 60)
  const secondsCountdown = Math.floor(activeTimerSeconds % 60)

  const minutesCountdownString = String(minutesCountdown).padStart(2, '0')
  const secondsCountdownString = String(secondsCountdown).padStart(2, '0')

  useEffect(() => {
    if (activeTimerSeconds) {
      document.title = `Countdown ${minutesCountdownString}:${secondsCountdownString}`
    }
    return () => {
      document.title = 'Ignite Timer'
    }
  }, [minutesCountdownString, secondsCountdownString, activeTimerSeconds])

  function stopTheCount() {
    setTimers((state) =>
      state.map((timer) => {
        if (timer.id === activeTimerId) {
          timer.interruptedAt = Date.now()
        }
        return timer
      }),
    )
    setActiveTimerId(null)
  }

  console.log(timers)

  return (
    <HomeContainer>
      <form
        id="timerForm"
        method="post"
        onSubmit={handleSubmit(handleCreateTimer)}
      >
        <label htmlFor="task">I am working on</label>
        <TaskInput
          type="text"
          id="task"
          placeholder="Name your task"
          list="task-suggestions"
          {...register('task')}
          disabled={Boolean(activeTimerSeconds)}
        />
        <datalist id="task-suggestions">
          <option>Placeholder 1</option>
          <option>Placeholder 2</option>
          <option>Placeholder 3</option>
        </datalist>
        <label htmlFor="minutes">for</label>
        <TimeInput
          type="number"
          id="minutes"
          min={5}
          max={60}
          step={5}
          {...register('minutes', { valueAsNumber: true })}
          disabled={Boolean(activeTimerSeconds)}
        />
        <span>minutes.</span>
      </form>
      <div className="display">
        <span className="digit">{minutesCountdownString[0]}</span>
        <span className="digit">{minutesCountdownString[1]}</span>
        <b className="separator">:</b>
        <span className="digit">{secondsCountdownString[0]}</span>
        <span className="digit">{secondsCountdownString[1]}</span>
      </div>
      {activeTimerSeconds ? (
        <StopButton type="button" onClick={stopTheCount}>
          <HandPalm size={24} /> Stop
        </StopButton>
      ) : (
        <StartButton type="submit" form="timerForm" disabled={isTaskFieldValid}>
          <Play size={24} /> Start
        </StartButton>
      )}
    </HomeContainer>
  )
}
