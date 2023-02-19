import { CalendarBlank, TagSimple } from 'phosphor-react'
import { CSSProperties, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled, { useTheme } from 'styled-components'
import { breakpoint } from '../../../styles/global'
import { currencyFormatter } from '../../../utils/formatter'
import useTable from '../hooks/useTable'
import TablePagination from './TablePagination'
import { Transaction } from './Transactions'

interface TransactionsTableProps {
  data: Transaction[]
}

export function TransactionsTable({ data }: TransactionsTableProps) {
  const [page, setPage] = useState(1)
  const { slice, range } = useTable(data, page, 10)

  return (
    // TODO: this wrapper styled
    <>
      <div
        style={{ overflowY: 'scroll', height: '500px', scrollbarWidth: 'none' }}
      >
        <StyledTable>
          {slice.map((transaction) => (
            <Row
              key={transaction.id}
              title={transaction.title}
              amount={
                Math.random() > 0.5
                  ? transaction.amount
                  : -1 * transaction.amount
              }
              tag={transaction.tag}
              date={new Date(transaction.date)}
            />
          ))}
        </StyledTable>
      </div>
      <TablePagination
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
      />
    </>
  )
}

const StyledTable = styled.div`
  display: grid;
  gap: calc(0.75rem - clamp(0rem, -0.152rem + 0.65vw, 0.25rem));
`

interface RowProps {
  title: string
  amount: number
  tag: string
  date: Date
}

function Row({ title, amount, tag, date }: RowProps) {
  const theme = useTheme()
  const isMobile = !useMediaQuery({
    query: `(min-width: ${breakpoint.lg})`,
  })

  useEffect(() => {
    function setCellAlignment(
      cell: HTMLElement,
      container: HTMLElement,
      threshold = rowLeftPadding,
    ) {
      const cellRelativeOffset = cell.offsetLeft - container.offsetLeft
      if (cellRelativeOffset <= threshold) {
        cells.forEach((cell) => (cell.style.textAlign = 'start'))
      } else {
        cells.forEach((cell) => (cell.style.textAlign = 'end'))
      }
    }

    const row = document.querySelector('.row') as HTMLElement
    const cells = document.querySelectorAll<HTMLElement>('.amount')
    const rowLeftPadding = 32 // Max possible value
    //* Suffering from glitches because of clamp()
    // const rowLeftPadding = Number(
    //   window.getComputedStyle(row).getPropertyValue('padding-left').slice(0, 2),
    // )
    const resizeObserver = new ResizeObserver(() => {
      setCellAlignment(cells[0], row)
    })

    resizeObserver.observe(row)
  }, [])

  return (
    <StyledRow className="row">
      <StyledHalfRow className="half__first">
        <StyledCell
          style={
            {
              '--flex': '1 1 16rem',
              '--color': theme['gray-300'],
            } as CSSProperties
          }
        >
          {title}
        </StyledCell>
        <StyledCell
          className="amount"
          style={
            {
              '--flex': '0 0 12.5rem',
              '--fs': isMobile ? theme['fs-xl'] : theme.fs,
              '--color': amount > 0 ? theme['green-300'] : theme['red-300'],
            } as CSSProperties
          }
        >
          {currencyFormatter(amount)}
        </StyledCell>
      </StyledHalfRow>
      <StyledHalfRow className="half__last">
        <StyledCell style={{ '--color': theme['gray-500'] } as CSSProperties}>
          {isMobile && <TagSimple size={16} />}
          {tag}
        </StyledCell>
        <StyledCell
          style={
            {
              '--break': 'normal',
              '--hyp': 'none',
              '--color': theme['gray-500'],
            } as CSSProperties
          }
        >
          {isMobile && <CalendarBlank size={16} />}
          {new Intl.DateTimeFormat('en-US').format(date)}
        </StyledCell>
      </StyledHalfRow>
    </StyledRow>
  )
}

const StyledRow = styled.div`
  background-color: ${(p) => p.theme['gray-700']};
  border-radius: ${(p) => p.theme.br};
  padding-block: calc(1.5rem - clamp(0rem, -0.152rem + 0.65vw, 0.25rem));
  padding-inline: clamp(1.25rem, 0.794rem + 1.94vw, 2rem);

  display: flex;
  flex-flow: row wrap;
  row-gap: 1rem;
  column-gap: clamp(2rem, 2rem + 5vw, 7rem);
`

const StyledHalfRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 0.75rem;
  column-gap: 1rem;
  word-break: break-word;
  hyphens: auto;

  &.half__first {
    flex: 2 1 20rem;
    flex-flow: row wrap;
  }

  &.half__last {
    flex: 1 1 15rem;
  }
`

//! Flex not working properly??
const StyledCell = styled.span`
  flex: var(--flex, 0 0 auto);
  color: var(--color, inherit);
  font-size: var(--fs, ${(p) => p.theme.fs});
  word-break: var(--break, inherit);
  hyphens: var(--hyp, inherit);

  svg {
    margin-right: 0.25rem;
    vertical-align: -3px;
  }
`
