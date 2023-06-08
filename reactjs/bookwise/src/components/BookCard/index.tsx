import Image from 'next/image'
import { ReadTag, S_BookCard } from './styles'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import { config } from '@/styles/stitches.config'
import { ComponentProps, useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { EBook } from '@/@types/entities'

const { theme } = config

type Variants = Pick<ComponentProps<typeof S_BookCard>, 'size'>

export interface BookCardProps extends Variants {
  book: EBook
}

export function BookCard({ book, size }: BookCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(book)
  }

  return (
    <S_BookCard
      className="book-card"
      size={size}
      title={`${book.name} por ${book.author}`}
      role="button"
      onClick={handleOpenBookDrawer}
      tabIndex={0}
    >
      <Image
        src={book.coverUrl}
        width={108}
        height={152}
        alt={`Capa de ${book.name}`}
      />
      <hgroup>
        <h4>{book.name}</h4>
        <p>{book.author}</p>
      </hgroup>
      <Rating
        initialValue={book.rating}
        readonly
        allowFraction
        emptyIcon={<Star />}
        emptyColor={theme.colors.purple100}
        fillIcon={<Star weight="fill" />}
        fillColor={theme.colors.purple100}
      />
      {book.userHasRead && <ReadTag>Lido</ReadTag>}
    </S_BookCard>
  )
}

BookCard.toString = () => '.book-card'
