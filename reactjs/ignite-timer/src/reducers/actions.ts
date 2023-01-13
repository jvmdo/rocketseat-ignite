/* eslint-disable no-unused-vars */

import { Timer } from './timers'

export enum ActionTypes {
  CREATE_NEW_TIMER = 'CREATE_NEW_TIMER',
  STOP_COUNTDOWN = 'STOP_COUNTDOWN',
  FINISH_COUNTDOWN = 'FINISH_COUNTDOWN',
}

export function createNewTimerAction(newTimer: Timer) {
  return {
    type: ActionTypes.CREATE_NEW_TIMER,
    payload: { newTimer },
  }
}

export function stopCountdownAction() {
  return {
    type: ActionTypes.STOP_COUNTDOWN,
  }
}

export function finishCountdownAction() {
  return {
    type: ActionTypes.FINISH_COUNTDOWN,
  }
}
