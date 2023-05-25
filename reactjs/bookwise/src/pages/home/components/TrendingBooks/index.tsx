import { ComponentProps } from 'react'
import {
  S_TrendingBooks,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
} from './styles'
import { BookCard } from '@/components/BookCard'
import { PageLink } from '@/components/PageLink'
import { CaretRight } from '@phosphor-icons/react'

export interface TrendingBooksProps
  extends ComponentProps<typeof S_TrendingBooks> {}

export function TrendingBooks() {
  return (
    <S_TrendingBooks className="trending-books">
      <header>
        <h3>Livros populares</h3>
        <PageLink href="/explorar" color="purple">
          <span>Ver todos</span>
          <CaretRight />
        </PageLink>
      </header>
      <ScrollAreaRoot>
        <ScrollAreaViewport>
          <ol>
            <li>
              <BookCard />
            </li>
            <li>
              <BookCard />
            </li>
            <li>
              <BookCard />
            </li>
            <li>
              <BookCard />
            </li>
          </ol>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal" />
        <ScrollAreaScrollbar orientation="vertical" />
      </ScrollAreaRoot>
    </S_TrendingBooks>
  )
}

TrendingBooks.toString = () => '.trending-books'
