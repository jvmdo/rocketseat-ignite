import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Timer {
  id: string
  task: string
  minutes: number
  startAt: number
  interruptedAt?: number
  finishedAt?: number
}

interface TimerState {
  timers: Timer[]
  activeTimerId: string | null
}

interface DispatchActions {
  payload?: { newTimer: Timer }
  type: ActionTypes
}

export function timerReducer(state: TimerState, action: DispatchActions) {
  const activeTimerIndex = state.timers.findIndex(
    (timer) => timer.id === state.activeTimerId,
  )

  switch (action.type) {
    case ActionTypes.CREATE_NEW_TIMER:
      return produce(state, (draft) => {
        draft.timers.unshift(action.payload!.newTimer)
        draft.activeTimerId = action.payload!.newTimer.id
      })

    case ActionTypes.STOP_COUNTDOWN: {
      return !~activeTimerIndex
        ? state
        : produce(state, (draft) => {
            draft.timers[activeTimerIndex].interruptedAt = Date.now()
            draft.activeTimerId = null
          })
    }

    case ActionTypes.FINISH_COUNTDOWN:
      return !~activeTimerIndex
        ? state
        : produce(state, (draft) => {
            draft.timers[activeTimerIndex].finishedAt = Date.now()
            draft.activeTimerId = null
          })

    default:
      return state
  }
}
