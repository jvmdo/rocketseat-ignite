import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer, StartButton, StopButton } from './styles'
import { useContext, useState } from 'react'
import { TimerContext } from '../../contexts/TimerContext'
import { TimerDisplay } from './components/TimerDisplay'
import { TimerForm } from './components/TimerForm'

export function Home() {
  const { timers, activeTimerId, setCurrentTimerStatus } =
    useContext(TimerContext)

  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  function stopTheCount() {
    setCurrentTimerStatus('interruptedAt')
  }

  function handleTaskValidnessChange(isValid: boolean) {
    setIsBtnDisabled(!isValid)
  }

  console.log('Timers', timers)

  return (
    <HomeContainer>
      <TimerForm onTaskValidnessChange={handleTaskValidnessChange} />
      <TimerDisplay />
      {activeTimerId ? (
        <StopButton type="button" onClick={stopTheCount}>
          <HandPalm size={24} /> Stop
        </StopButton>
      ) : (
        <StartButton type="submit" form="timerForm" disabled={isBtnDisabled}>
          <Play size={24} /> Start
        </StartButton>
      )}
    </HomeContainer>
  )
}
