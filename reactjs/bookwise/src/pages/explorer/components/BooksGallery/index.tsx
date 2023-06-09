import { EBook } from '@/@types/entities'
import { S_BooksGallery } from './styles'
import { BookCard } from '@/components/BookCard'
import { api } from '@/lib/axios'
import { useEffect } from 'react'
import useSWR from 'swr'

export interface BooksGalleryProps {
  search: string
  tags: string[]
  setIsLoading: (isLoading: boolean) => void
}

export function BooksGallery({
  search,
  tags,
  setIsLoading,
}: BooksGalleryProps) {
  const { data: books, isLoading } = useSWR(['/books', search, tags], fetcher, {
    keepPreviousData: true,
  })

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading])

  return (
    <S_BooksGallery className="books-gallery" withSpinner={isLoading}>
      {books && books.length === 0 ? (
        <p>No book found</p>
      ) : (
        books?.map((book) => (
          <li key={book.id}>
            <BookCard size="big" book={book} />
          </li>
        ))
      )}
    </S_BooksGallery>
  )
}

BooksGallery.toString = () => '.books-gallery'

type SwrKey = [path: string, search: string, tags: string[]]

async function fetcher(key: SwrKey) {
  const url = formatUrl(key)

  return (await api.get<EBook[]>(url)).data
}

function formatUrl([path, search, tags]: SwrKey) {
  const params = new URLSearchParams()

  if (search) {
    params.append('search', search)
  }

  if (tags) {
    for (const tag of tags) {
      params.append('tags', tag)
    }
  }

  const queryString = params.toString()

  return path + (queryString ? `?${queryString}` : '')
}
