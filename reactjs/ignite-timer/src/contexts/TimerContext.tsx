import { createContext, ReactNode, useState } from 'react'

interface TimerFormData {
  task: string
  minutes: number
}

interface Timer {
  id: string
  task: string
  minutes: number
  startAt: number
  interruptedAt?: number
  finishedAt?: number
}

interface TimerContextProps {
  timers: Timer[]
  activeTimerId: string | null
  createNewTimer: (data: TimerFormData) => void
  setCurrentTimerStatus: (status: string) => void
}

export const TimerContext = createContext({} as TimerContextProps)

interface TimerContextProviderProps {
  children: ReactNode
}

export function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([])
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null)

  function setCurrentTimerStatus(status: string) {
    setTimers((state) =>
      state.map((timer) => {
        if (timer.id === activeTimerId) {
          return { ...timer, [status]: Date.now() }
        }
        return timer
      }),
    )
    setActiveTimerId(null)
  }

  function createNewTimer(data: TimerFormData) {
    const newTimer: Timer = {
      id: crypto.randomUUID(),
      task: data.task,
      minutes: data.minutes,
      startAt: Date.now() / 1000,
    }

    setTimers((state) => [newTimer, ...state])
    setActiveTimerId(newTimer.id)
  }

  return (
    <TimerContext.Provider
      value={{
        timers,
        activeTimerId,
        createNewTimer,
        setCurrentTimerStatus,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
