import React from 'react'
import { S_RecentBookReviews } from './styles'
import { ReviewCard } from '@/components/ReviewCard'
import useSWR from 'swr'
import { api } from '@/lib/axios'
import { EReview } from '@/@types/entities'

export interface RecentBookReviewsProps {
  recentReviews: EReview[]
}

export function RecentBookReviews() {
  const { data: recentReviews } = useSWR('/reviews', fetcher, {
    refreshInterval: 1000 * 60 * 2, // 2 minutes
  })

  return (
    <S_RecentBookReviews className="recent-book-reviews">
      <header>
        <h3>Avaliações mais recentes</h3>
      </header>
      <ol>
        {recentReviews?.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ol>
    </S_RecentBookReviews>
  )
}

RecentBookReviews.toString = () => '.recent-book-reviews'

async function fetcher(url: string) {
  return (await api.get<EReview[]>(url)).data
}
