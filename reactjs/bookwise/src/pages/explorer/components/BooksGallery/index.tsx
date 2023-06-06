import { S_BooksGallery } from './styles'
import { BookCard, BookCardProps } from '@/components/BookCard'
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
  // TODO: try array key
  const fetchState = useSWR(formatKey(search, tags), fetcher, {
    keepPreviousData: true,
  })

  const { data: books, isLoading, error } = fetchState

  useEffect(() => setIsLoading(isLoading), [isLoading, setIsLoading])

  if (error) {
    return <p>Something bad occurred 😔</p>
  }

  return (
    <S_BooksGallery className="books-gallery" withSpinner={isLoading}>
      {books && books.length === 0 ? (
        <p>No book found</p>
      ) : (
        books?.map((book) => (
          <li key={book.id}>
            <BookCard size="big" {...book} />
          </li>
        ))
      )}
    </S_BooksGallery>
  )
}

BooksGallery.toString = () => '.books-gallery'

function formatKey(search?: string, tags?: string[]) {
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

  return '/books' + (queryString ? `?${queryString}` : '')
}

async function fetcher(url: string) {
  return (await api.get<BookCardProps[]>(url)).data
}
