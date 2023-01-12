import { useContext } from 'react'
import { TimerContext } from '../../contexts/TimerContext'
import { HistoryContainer, StatusFlag, TableContainer } from './styles'
import { formatDistanceToNow } from 'date-fns'

export function History() {
  const { timers } = useContext(TimerContext)

  return (
    <HistoryContainer>
      <h1>My history</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timers.map((timer) => {
              return (
                <tr key={timer.id}>
                  <td>{timer.task}</td>
                  <td>{timer.minutes} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(timer.startAt * 1000), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {timer.finishedAt ? (
                      <StatusFlag color="green">Finished</StatusFlag>
                    ) : timer.interruptedAt ? (
                      <StatusFlag color="red">Interrupted</StatusFlag>
                    ) : (
                      <StatusFlag color="yellow">On going</StatusFlag>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableContainer>
    </HistoryContainer>
  )
}
