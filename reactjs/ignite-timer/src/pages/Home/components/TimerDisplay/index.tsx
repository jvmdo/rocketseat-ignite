import { useContext, useEffect, useState } from 'react'
import { TimerContext } from '../../../../contexts/TimerContext'
import { ActionTypes } from '../../../../reducers/actions'
import { DisplayContainer } from './styles'

export function TimerDisplay() {
  const { timers, activeTimerId, setCurrentTimerStatus } =
    useContext(TimerContext)

  const [secondsLeftToEnd, setSecondsLeftToEnd] = useState(0)

  const currentActiveTimer = timers.find(({ id }) => id === activeTimerId)

  useEffect(() => {
    let tick: number

    if (currentActiveTimer) {
      const endAt = currentActiveTimer.startAt + currentActiveTimer.minutes

      // It takes 1s until the setInterval's callback first execution
      // Display the total minutes immediately
      setSecondsLeftToEnd(currentActiveTimer.minutes * 60)

      tick = setInterval(() => {
        const differenceInSeconds = Math.round(endAt - Date.now() / 1000)
        setSecondsLeftToEnd(differenceInSeconds)

        if (differenceInSeconds <= 0) {
          setCurrentTimerStatus(ActionTypes.FINISH_COUNTDOWN)
          setSecondsLeftToEnd(0)
        }
      }, 1000)
    }

    return () => clearInterval(tick)
  }, [currentActiveTimer, setCurrentTimerStatus])

  const activeTimerSeconds = currentActiveTimer ? secondsLeftToEnd : 0
  const minutesCountdown = Math.floor(activeTimerSeconds / 60)
  const secondsCountdown = Math.floor(activeTimerSeconds % 60)

  const minutesCountdownString = String(minutesCountdown).padStart(2, '0')
  const secondsCountdownString = String(secondsCountdown).padStart(2, '0')

  useEffect(() => {
    if (currentActiveTimer) {
      document.title = `Countdown ${minutesCountdownString}:${secondsCountdownString}`
    }
    return () => {
      document.title = 'Ignite Timer'
    }
  }, [minutesCountdownString, secondsCountdownString, currentActiveTimer])

  return (
    <DisplayContainer>
      <span className="digit">{minutesCountdownString[0]}</span>
      <span className="digit">{minutesCountdownString[1]}</span>
      <b className="separator">:</b>
      <span className="digit">{secondsCountdownString[0]}</span>
      <span className="digit">{secondsCountdownString[1]}</span>
    </DisplayContainer>
  )
}
