import { S_BooksGallery } from './styles'
import { BookCard, BookCardProps } from '@/components/BookCard'
import { api } from '@/lib/axios'
import useSWR from 'swr'

export interface BooksGalleryProps {
  search: string
}

export function BooksGallery({ search }: BooksGalleryProps) {
  const results = useSWR(`/books?search=${search}`, fetcher, {
    keepPreviousData: true,
  })

  const { data: books, isLoading, error } = results

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

async function fetcher(url: string) {
  // await new Promise((resolve) => setTimeout(resolve, 2600))
  return (await api.get<BookCardProps[]>(url)).data
}
