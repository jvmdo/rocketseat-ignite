import { config } from '@/styles/stitches.config'
import { S_LastReadCard } from './styles'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { BookCardProps } from '../BookCard'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

const { theme } = config

export interface LastReadCardProps {
  updatedAt: string
  book: BookCardProps
}

export function LastReadCard({ updatedAt, book }: LastReadCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(book)
  }

  return (
    <S_LastReadCard role="button" onClick={handleOpenBookDrawer} tabIndex={0}>
      <header>
        <p>
          {formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <Rating
          initialValue={book.rating}
          readonly
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        />
      </header>
      <hgroup>
        <h3>{book.name}</h3>
        <p>{book.author}</p>
      </hgroup>
      <Image
        src={book.coverUrl}
        width={108}
        height={152}
        alt={`Capa de ${book.name}`}
      />
      <p>{book.summary}</p>
    </S_LastReadCard>
  )
}
