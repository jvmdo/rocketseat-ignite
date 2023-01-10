import { HistoryContainer, StatusFlag, TableContainer } from './styles'

export function History() {
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
            <tr>
              <td>Lorem ipsum dolor sit amet consectetur</td>
              <td>60 minutes</td>
              <td>About 1 hours ago</td>
              <td>
                <StatusFlag color="yellow">On going</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Adipisicing elit. Voluptates amet molestiae</td>
              <td>15 minutes</td>
              <td>2 days ago</td>
              <td>
                <StatusFlag color="red">Interrupted</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Laudantium at delectus totam ad hic</td>
              <td>25 minutes</td>
              <td>3 days ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Quibusdam eligendi odio?</td>
              <td>5 minutes</td>
              <td>1 week ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Lorem ipsum dolor sit amet consectetur</td>
              <td>60 minutes</td>
              <td>About 1 hours ago</td>
              <td>
                <StatusFlag color="yellow">On going</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Adipisicing elit. Voluptates amet molestiae</td>
              <td>15 minutes</td>
              <td>2 days ago</td>
              <td>
                <StatusFlag color="red">Interrupted</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Laudantium at delectus totam ad hic</td>
              <td>25 minutes</td>
              <td>3 days ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Quibusdam eligendi odio?</td>
              <td>5 minutes</td>
              <td>1 week ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Lorem ipsum dolor sit amet consectetur</td>
              <td>60 minutes</td>
              <td>About 1 hours ago</td>
              <td>
                <StatusFlag color="yellow">On going</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Adipisicing elit. Voluptates amet molestiae</td>
              <td>15 minutes</td>
              <td>2 days ago</td>
              <td>
                <StatusFlag color="red">Interrupted</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Laudantium at delectus totam ad hic</td>
              <td>25 minutes</td>
              <td>3 days ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Quibusdam eligendi odio?</td>
              <td>5 minutes</td>
              <td>1 week ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Lorem ipsum dolor sit amet consectetur</td>
              <td>60 minutes</td>
              <td>About 1 hours ago</td>
              <td>
                <StatusFlag color="yellow">On going</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Adipisicing elit. Voluptates amet molestiae</td>
              <td>15 minutes</td>
              <td>2 days ago</td>
              <td>
                <StatusFlag color="red">Interrupted</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Laudantium at delectus totam ad hic</td>
              <td>25 minutes</td>
              <td>3 days ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
            <tr>
              <td>Quibusdam eligendi odio?</td>
              <td>5 minutes</td>
              <td>1 week ago</td>
              <td>
                <StatusFlag color="green">Concluded</StatusFlag>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </HistoryContainer>
  )
}
