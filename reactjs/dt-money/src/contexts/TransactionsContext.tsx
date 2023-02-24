import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export type Transaction = {
  id: number
  title: string
  amount: number
  tag: string
  date: number
}

type NewTransactionType = {
  description: string
  price: string
  category: string
  type: 'income' | 'outcome'
}

type TransactionsContextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => void
  createTransaction: (transaction: NewTransactionType) => void
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

  async function createTransaction(transaction: NewTransactionType) {
    const amount =
      transaction.type === 'income'
        ? Number(transaction.price)
        : -1 * Number(transaction.price)

    try {
      const response = await api.post('/transactions', {
        title: transaction.description,
        amount,
        tag: transaction.category,
        date: Date.now(),
      })
      setTransactions((state) => [response.data, ...state])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
