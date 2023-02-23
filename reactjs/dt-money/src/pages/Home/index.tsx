import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Dashboard } from './components/Dashboard'
import { Transactions } from './components/Transactions'

export function Home() {
  const transactions = useContext(TransactionsContext)

  return (
    <main>
      {transactions.length ? (
        <>
          <Dashboard />
          <Transactions />
        </>
      ) : (
        <span>Loading</span>
      )}
    </main>
  )
}
