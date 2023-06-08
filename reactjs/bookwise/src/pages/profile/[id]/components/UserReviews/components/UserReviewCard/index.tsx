import React, { useContext } from 'react'
import { CardBody, CardHead, S_UserReviewCard } from './styles'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Star } from '@phosphor-icons/react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { EUserReview } from '@/@types/entities'

const { theme } = config

interface UserReviewCardProps {
  review: EUserReview
  userName: string | null
}

export function UserReviewCard({ userName, review }: UserReviewCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(review.book)
  }

  return (
    <S_UserReviewCard
      title={`Avaliação de ${review.book.name} por ${userName}`}
      tabIndex={0}
      role="button"
      onClick={handleOpenBookDrawer}
    >
      <CardHead>
        <Image
          src={review.book.coverUrl}
          width={98}
          height={134}
          alt={`Capa de ${review.book.name}`}
        />
        <hgroup>
          <h3>{review.book.name}</h3>
          <p>{review.book.author}</p>
        </hgroup>
        <Rating
          initialValue={review.rate}
          readonly
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        />
      </CardHead>
      <CardBody>{review.description}</CardBody>
    </S_UserReviewCard>
  )
}
