import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export type Transaction = {
  id: number
  title: string
  amount: number
  tag: string
  date: number
}

type TransactionsContextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => void
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    try {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'date',
          _order: 'desc',
          q: query,
        },
      })
      setTransactions(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
