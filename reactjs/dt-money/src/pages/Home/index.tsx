import { Dashboard } from './components/Dashboard'
import { Transactions } from './components/Transactions'

export function Home() {
  return (
    <main>
      <Dashboard />
      <Transactions />
    </main>
  )
}
