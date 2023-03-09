import { useState, useEffect } from 'react'
import { Transaction } from '../../../contexts/TransactionsContext'

function generateRange(length: number, rowsPerPage: number) {
  return Array.from({ length: Math.ceil(length / rowsPerPage) }, (_, i) => ++i)
}

function sliceRange(currentPage: number, range: number[], slice = 3) {
  if (currentPage === range.at(0)! - 1) {
    return range.slice(0, slice)
  } else if (currentPage === range.at(-1)! - 1) {
    return range.slice(-slice, range.length)
  }
  return range.slice(currentPage - 1, currentPage + slice - 1)
}

function sliceData(data: Transaction[], page: number, rowsPerPage: number) {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}

const useTable = (data: Transaction[], page: number, rowsPerPage: number) => {
  // TODO: use reducer
  const [tableRange, setTableRange] = useState<number[]>([])
  const [slice, setSlice] = useState<Transaction[]>([])

  useEffect(() => {
    const range = generateRange(data.length, rowsPerPage)
    setTableRange([...range])

    const slice = sliceData(data, page, rowsPerPage)
    setSlice([...slice])

    document.querySelector('.tableScrollViewport')!.scrollTop = 0
  }, [data, setTableRange, page, setSlice, rowsPerPage])

  return {
    slice,
    range: sliceRange(page - 1, tableRange),
    rangeTotalLength: tableRange.length,
  }
}

export default useTable
