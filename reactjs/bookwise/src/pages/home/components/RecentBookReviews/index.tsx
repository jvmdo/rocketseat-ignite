import React from 'react'
import { S_RecentBookReviews } from './styles'
import { ReviewCard, ReviewCardProps } from '@/components/ReviewCard'

export interface RecentBookReviewsProps {
  recentReviews: ReviewCardProps[]
}

export function RecentBookReviews({ recentReviews }: RecentBookReviewsProps) {
  return (
    <S_RecentBookReviews className="recent-book-reviews">
      <header>
        <h3>Avaliações mais recentes</h3>
      </header>
      <ol>
        {recentReviews.map((review) => (
          <li key={review.id}>
            <ReviewCard {...review} />
          </li>
        ))}
      </ol>
    </S_RecentBookReviews>
  )
}

RecentBookReviews.toString = () => '.recent-book-reviews'
