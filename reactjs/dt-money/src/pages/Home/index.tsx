import { Dashboard } from './components/Dashboard'
import { Transactions } from './components/Transactions'
// import * as S from './styles'

export function Home() {
  // TODO: load data here
  return (
    <main>
      <Dashboard />
      <Transactions />
    </main>
  )
}
