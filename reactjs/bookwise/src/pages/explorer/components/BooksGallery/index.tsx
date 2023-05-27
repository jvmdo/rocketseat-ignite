import { ComponentProps } from 'react'
import { S_BooksGallery } from './styles'
import { BookCard } from '@/components/BookCard'

export interface BooksGalleryProps
  extends ComponentProps<typeof S_BooksGallery> {}

export function BooksGallery() {
  return (
    <S_BooksGallery className="books-gallery">
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
      <li>
        <BookCard size="big" />
      </li>
    </S_BooksGallery>
  )
}

BooksGallery.toString = () => '.books-gallery'
