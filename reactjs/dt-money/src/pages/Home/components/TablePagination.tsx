import { CaretLeft, CaretRight } from 'phosphor-react'
import { Dispatch, SetStateAction } from 'react'
import styles from './TablePagination.module.css'
import { Transaction } from './Transactions'

function sliceRange(currentPage: number, range: number[], slice = 3) {
  if (currentPage === range.at(0)! - 1) {
    return range.slice(0, slice)
  } else if (currentPage === range.at(-1)! - 1) {
    return range.slice(-slice, range.length)
  }
  return range.slice(currentPage - 1, currentPage + slice - 1)
}

interface TablePaginationProps {
  range: number[]
  slice: Transaction[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const TablePagination = ({
  range,
  setPage,
  page,
  slice,
}: TablePaginationProps) => {
  const slicedRange = sliceRange(page - 1, range)

  function handleSetPage(currentPage: number) {
    setPage(currentPage)
  }

  // TODO: change to styled comps
  return (
    <div className={styles.tableFooter}>
      <button
        className={[styles.paginator, page !== 1 && styles.active].join(' ')}
        disabled={page === 1}
        onClick={() => handleSetPage(--page)}
      >
        <CaretLeft size={24} weight="bold" />
      </button>
      <div className={styles.tablePages}>
        {slicedRange.map((currentPage) => (
          <button
            key={currentPage}
            className={`${styles.button} ${
              page === currentPage ? styles.activeButton : styles.inactiveButton
            }`}
            onClick={() => handleSetPage(currentPage)}
          >
            {currentPage}
          </button>
        ))}
      </div>
      <button
        className={[
          styles.paginator,
          page !== range.length && styles.active,
        ].join(' ')}
        disabled={page === range.length}
        onClick={() => handleSetPage(++page)}
      >
        <CaretRight size={24} weight="bold" />
      </button>
    </div>
  )
}

export default TablePagination
