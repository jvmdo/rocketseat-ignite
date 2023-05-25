import React, { ComponentProps } from 'react'
import { S_RecentBookReviews } from './styles'
import { ReviewCard } from '@/components/ReviewCard'

export interface RecentBookReviewsProps
  extends ComponentProps<typeof S_RecentBookReviews> {}

export function RecentBookReviews() {
  return (
    <S_RecentBookReviews className="recent-book-reviews">
      <header>
        <h3>Avaliações mais recentes</h3>
      </header>
      <ol>
        <li>
          <ReviewCard />
        </li>
        <li>
          <ReviewCard />
        </li>
        <li>
          <ReviewCard />
        </li>
        <li>
          <ReviewCard />
        </li>
      </ol>
    </S_RecentBookReviews>
  )
}

RecentBookReviews.toString = () => '.recent-book-reviews'
