import {
  S_TrendingBooks,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
} from './styles'
import { BookCard, BookCardProps } from '@/components/BookCard'
import { PageLink } from '@/components/PageLink'
import { CaretRight } from '@phosphor-icons/react'

export interface TrendingBooksProps {
  popularBooks: BookCardProps[]
}

export function TrendingBooks({ popularBooks }: TrendingBooksProps) {
  return (
    <S_TrendingBooks className="trending-books">
      <header>
        <h3>Livros populares</h3>
        <PageLink href="/explorer" color="purple">
          <span>Ver todos</span>
          <CaretRight />
        </PageLink>
      </header>
      <ScrollAreaRoot>
        <ScrollAreaViewport>
          <ol>
            {popularBooks.map((book) => (
              <li key={book.id}>
                <BookCard {...book} />
              </li>
            ))}
          </ol>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal" />
        <ScrollAreaScrollbar orientation="vertical" />
      </ScrollAreaRoot>
    </S_TrendingBooks>
  )
}

TrendingBooks.toString = () => '.trending-books'
