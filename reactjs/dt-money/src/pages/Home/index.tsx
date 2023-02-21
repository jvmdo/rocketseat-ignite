import { useEffect, useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Transaction, Transactions } from './components/Transactions'
import dataJson from '../../data/data.json'

export function Home() {
  const [data, setData] = useState<Transaction[]>([])

  useEffect(() => {
    function loadData(): Transaction[] {
      return JSON.parse(JSON.stringify(dataJson))
    }
    const rawData = loadData()
    setData(
      rawData.map((entry) => {
        entry.amount = Math.random() < 0.5 ? -1 * entry.amount : entry.amount
        return entry
      }),
    )
  }, [])

  return (
    <main>
      {data.length ? (
        <>
          <Dashboard data={data} />
          <Transactions data={data} />
        </>
      ) : (
        <span>Loading</span>
      )}
    </main>
  )
}
