import React, { ComponentProps, useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { S_ReviewCard } from './styles'
import { formatInitials } from '@/utils/format-initials'
import { LinkWrapper } from '@/components/LinkWrapper'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { EBookReview } from '@/@types/entities'

const { theme } = config

type Variants = Pick<ComponentProps<typeof S_ReviewCard>, 'highlight'>

interface ReviewCardProps extends Variants {
  review: EBookReview
}

export default function ReviewCard({ review, highlight }: ReviewCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleBookDrawerClose() {
    setDrawerBook(undefined)
  }

  return (
    <S_ReviewCard highlight={highlight}>
      <header>
        <div className="user-info">
          <LinkWrapper
            href={`/profile/${review.user.id}`}
            size="round"
            onClick={handleBookDrawerClose}
          >
            <Image
              src={review.user.image ?? ''}
              width={40}
              height={40}
              alt={formatInitials(review.user.name)}
            />
          </LinkWrapper>
          <hgroup>
            <LinkWrapper
              href={`/profile/${review.user.id}`}
              type="text"
              onClick={handleBookDrawerClose}
            >
              <h4>{review.user.name}</h4>
            </LinkWrapper>
            <p>
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
          </hgroup>
        </div>
        <Rating
          readonly
          initialValue={review.rate}
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        />
      </header>
      <p>{review.description}</p>
    </S_ReviewCard>
  )
}
