import React, { useContext } from 'react'
import { CardBody, CardHead, S_UserReviewCard } from './styles'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Star } from '@phosphor-icons/react'
import { BookCardProps } from '@/components/BookCard'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

const { theme } = config

export type ReviewData = {
  id: string
  createdAt: Date
  description: string
  rate: number
  book: BookCardProps
}

export interface UserReviewCardProps {
  review: ReviewData
  userName: string
}

export function UserReviewCard({
  review: { book, ...review },
  userName,
}: UserReviewCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(book)
  }

  return (
    <S_UserReviewCard
      title={`Avaliação de ${book.name} por ${userName}`}
      tabIndex={0}
      role="button"
      onClick={handleOpenBookDrawer}
    >
      <CardHead>
        <Image
          src={book.coverUrl}
          width={98}
          height={134}
          alt={`${book.name} cover`}
        />
        <hgroup>
          <h3>{book.name}</h3>
          <p>{book.author}</p>
        </hgroup>
        <Rating
          initialValue={review.rate}
          readonly
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        ></Rating>
      </CardHead>
      <CardBody>{review.description}</CardBody>
    </S_UserReviewCard>
  )
}
