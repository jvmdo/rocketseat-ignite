import { ComponentProps } from 'react'
import { S_BooksGallery } from './styles'
import { BookCard } from '@/components/BookCard'

export interface BooksGalleryProps
  extends ComponentProps<typeof S_BooksGallery> {}

export function BooksGallery() {
  return (
    <S_BooksGallery className="books-gallery">
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
      <li>
        <BookCard size="big" read={true} />
      </li>
    </S_BooksGallery>
  )
}

BooksGallery.toString = () => '.books-gallery'
