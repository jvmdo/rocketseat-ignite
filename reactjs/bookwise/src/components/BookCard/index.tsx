import Image from 'next/image'
import { ReadTag, S_BookCard } from './styles'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import { config } from '@/styles/stitches.config'
import { ComponentProps } from 'react'

const { theme } = config

export interface BookCardProps extends ComponentProps<typeof S_BookCard> {
  imgSrc?: string
  title?: string
  author?: string
  rate?: number
  description?: string
  read?: boolean
}

export function BookCard({
  imgSrc = '/images/books/o-fim-da-eternidade.png',
  title = 'O fim da eternidade',
  author = 'Isaac Asimov',
  rate = 4,
  description = 'One of the books in history',
  read = false,
  ...props
}: BookCardProps) {
  function handleOpenBookDrawer() {
    console.count('Clicked!')
  }

  return (
    <S_BookCard
      role="button"
      tabIndex={0}
      onClick={handleOpenBookDrawer}
      title={title}
      className="book-card"
      {...props}
    >
      <Image src={imgSrc} width={108} height={152} alt={description} />
      <hgroup>
        <h4>{title}</h4>
        <p>{author}</p>
      </hgroup>
      <Rating
        initialValue={rate}
        readonly
        allowFraction
        emptyIcon={<Star />}
        emptyColor={theme.colors.purple100}
        fillIcon={<Star weight="fill" />}
        fillColor={theme.colors.purple100}
      ></Rating>
      {read && <ReadTag>Lido</ReadTag>}
    </S_BookCard>
  )
}

BookCard.toString = () => '.book-card'
