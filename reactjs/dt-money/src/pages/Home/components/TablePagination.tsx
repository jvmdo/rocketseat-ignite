import { CaretLeft, CaretRight } from 'phosphor-react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'

const StyledTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-block: 2rem 3rem;
`

const StyledTablePages = styled.div`
  display: flex;
  gap: 0.5rem;
`

interface PageButtonProps {
  isActive: boolean
}

const StyledPageButton = styled.button<PageButtonProps>`
  background-color: ${(p) =>
    p.isActive ? p.theme['green-700'] : p.theme['gray-600']};
  border: none;
  border-radius: ${(p) => p.theme.br};
  color: ${(p) => (p.isActive ? p.theme['gray-100'] : p.theme['gray-400'])};
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
`

interface PaginatorButtonProps {
  isOnEdge: boolean
}

const StyledPaginatorButton = styled.button<PaginatorButtonProps>`
  background-color: transparent;
  border: none;
  color: ${(p) => (p.isOnEdge ? p.theme['green-500'] : p.theme['gray-600'])};
  cursor: pointer;
`

interface TablePaginationProps {
  range: number[]
  rangeTotalLength: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

export function TablePagination({
  range,
  rangeTotalLength,
  page,
  setPage,
}: TablePaginationProps) {
  useEffect(() => {
    // Go to page 1 when filtering
    // It works only when the current page is out of range of the filtering result
    if (range.length <= 1 && page !== 1) {
      setPage(1)
    }
  }, [range, page, setPage])

  function handleSetPage(currentPage: number) {
    setPage(currentPage)
  }

  return (
    <StyledTableFooter>
      <StyledPaginatorButton
        isOnEdge={page !== 1}
        disabled={page === 1}
        onClick={() => handleSetPage(--page)}
      >
        <CaretLeft size={24} weight="bold" />
      </StyledPaginatorButton>
      <StyledTablePages>
        {range.map((currentPage) => (
          <StyledPageButton
            key={currentPage}
            isActive={page === currentPage}
            onClick={() => handleSetPage(currentPage)}
          >
            {currentPage}
          </StyledPageButton>
        ))}
      </StyledTablePages>
      <StyledPaginatorButton
        isOnEdge={page !== rangeTotalLength && range.length > 1}
        disabled={page === rangeTotalLength || range.length <= 1}
        onClick={() => handleSetPage(++page)}
      >
        <CaretRight size={24} weight="bold" />
      </StyledPaginatorButton>
    </StyledTableFooter>
  )
}
