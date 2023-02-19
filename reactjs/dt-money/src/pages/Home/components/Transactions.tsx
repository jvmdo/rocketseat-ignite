import { MagnifyingGlass } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { breakpoint, ContentContainer } from '../../../styles/global'
import { TransactionsTable } from './TransactionsTable'
import data from '../../../data/data.json'

const StyledTransactionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(0.75rem, 0.294rem + 1.94vw, 1.5rem);

  h2 {
    color: ${(p) => p.theme['gray-300']};
    font-size: ${(p) => p.theme['fs-lg']};
    font-weight: ${(p) => p.theme['fw-n']};
  }

  span {
    color: ${(p) => p.theme['gray-500']};
    font-size: ${(p) => p.theme.fs};
  }
`

const StyledTransactionForm = styled.form`
  display: flex;
  gap: clamp(0.5rem, 0.196rem + 1.3vw, 1rem);
  font-size: ${(p) => p.theme.fs};
  height: 3.375rem;
  margin-bottom: clamp(0.75rem, 0.294rem + 1.94vw, 1.5rem);

  input {
    flex: 1;
    background-color: ${(p) => p.theme['gray-900']};
    border: none;
    border-radius: ${(p) => p.theme.br};
    color: ${(p) => p.theme.white};
    font-size: clamp(1rem, 0.924rem + 0.32vw, 1.125rem);
    padding-inline: 1rem;

    &:focus-visible {
      box-shadow: 0 0 0 2px ${(p) => p.theme['green-500']};
    }

    &::placeholder {
      color: ${(p) => p.theme['gray-500']};
      font-size: ${(p) => p.theme.fs};
    }
  }

  button {
    flex: 0 0 auto;
    background-color: transparent;
    border: 2px solid ${(p) => p.theme['green-700']};
    border-radius: ${(p) => p.theme.br};
    color: ${(p) => p.theme['green-300']};
    font-weight: ${(p) => p.theme['fw-b']};
    padding-inline: 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background-color: ${(p) => p.theme['green-500']};
      border-color: ${(p) => p.theme['green-500']};
      color: ${(p) => p.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`

export type Transaction = {
  id: number
  title: string
  amount: number
  tag: string
  date: number
}

export function Transactions() {
  const [transactions, setTransaction] = useState<Transaction[]>([])
  const biggerThanKiss = useMediaQuery({
    query: `(min-width: ${breakpoint.lg})`,
  })

  useEffect(() => {
    const loadData = () => JSON.parse(JSON.stringify(data))
    setTransaction(loadData())
  }, [])

  function handleTransactionsFilter(event: FormEvent<HTMLFormElement>) {
    // TODO: data passed to table must be filtered if search is called
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('search-transaction')
    console.log(query)
    event.currentTarget.reset()
  }

  return (
    <section>
      <ContentContainer>
        {!biggerThanKiss && (
          <StyledTransactionsHeader>
            <h2>Transactions</h2>
            <span>{transactions.length} items</span>
          </StyledTransactionsHeader>
        )}
        <StyledTransactionForm
          autoComplete="on"
          onSubmit={handleTransactionsFilter}
        >
          <input
            type="search"
            name="search-transaction"
            placeholder="Search transactions by name"
          />
          <button>
            <MagnifyingGlass size={biggerThanKiss ? 20 : 22} weight="bold" />
            {biggerThanKiss && 'Search'}
          </button>
        </StyledTransactionForm>
        {transactions.length && <TransactionsTable data={transactions} />}
      </ContentContainer>
    </section>
  )
}
