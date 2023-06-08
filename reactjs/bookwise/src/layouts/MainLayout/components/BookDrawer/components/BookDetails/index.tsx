import { DialogTitle } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { About, Book, S_BookDetails } from './styles'
import { BookOpen, BookmarkSimple, Star } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { EBook } from '@/@types/entities'

const { theme } = config

interface BookDetailsProps {
  book: EBook
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <S_BookDetails>
      <Book>
        <hgroup>
          <DialogTitle>{book.name}</DialogTitle>
          <p>{book.author}</p>
        </hgroup>
        <Image
          src={book.coverUrl}
          width={171.65}
          height={242}
          alt={`Capa de ${book.name}`}
        />
        <div className="stars">
          <Rating
            initialValue={book.rating}
            readonly
            allowFraction
            emptyIcon={<Star />}
            emptyColor={theme.colors.purple100}
            fillIcon={<Star weight="fill" />}
            fillColor={theme.colors.purple100}
          />
          <span>{book.totalReviews} avaliações</span>
        </div>
      </Book>
      <About>
        <div>
          <BookmarkSimple />
          <span>Categoria</span>
          <strong>{book.categories.join(', ')}</strong>
        </div>
        <div>
          <BookOpen />
          <span>Páginas</span>
          <strong>{book.totalPages}</strong>
        </div>
      </About>
    </S_BookDetails>
  )
}
