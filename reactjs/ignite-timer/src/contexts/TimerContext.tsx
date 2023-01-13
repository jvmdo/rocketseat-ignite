import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { ActionTypes } from '../reducers/actions'
import { Timer, timerReducer } from '../reducers/timers'

interface TimerFormData {
  task: string
  minutes: number
}

interface TimerContextProps {
  timers: Timer[]
  activeTimerId: string | null
  createNewTimer: (data: TimerFormData) => void
  setCurrentTimerStatus: (action: ActionTypes) => void
}

export const TimerContext = createContext({} as TimerContextProps)

interface TimerContextProviderProps {
  children: ReactNode
}

export function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timersState, dispatch] = useReducer(
    timerReducer,
    {
      timers: [],
      activeTimerId: null,
    },
    (initialValue) => {
      // Local storage on first page render
      const storedTimers = localStorage.getItem('@ignite-timer:timers-0.1.0')

      if (storedTimers) {
        return JSON.parse(storedTimers)
      } else {
        return initialValue
      }
    },
  )

  const { timers, activeTimerId } = timersState

  useEffect(() => {
    // Local storage on every [timersState] change
    localStorage.setItem(
      '@ignite-timer:timers-0.1.0',
      JSON.stringify(timersState),
    )
  }, [timersState])

  function setCurrentTimerStatus(action: ActionTypes) {
    dispatch({ type: action })
  }

  function createNewTimer(data: TimerFormData) {
    const newTimer: Timer = {
      id: crypto.randomUUID(),
      task: data.task,
      minutes: data.minutes,
      startAt: Date.now() / 1000,
    }

    dispatch({
      type: ActionTypes.CREATE_NEW_TIMER,
      payload: { newTimer },
    })
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
