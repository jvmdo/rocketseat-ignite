import React from 'react'
import { S_RecentBookReviews } from './styles'
import { ReviewCard, ReviewCardProps } from '@/components/ReviewCard'
import useSWR from 'swr'
import { api } from '@/lib/axios'

export interface RecentBookReviewsProps {
  recentReviews: ReviewCardProps[]
}

export function RecentBookReviews() {
  const fetchState = useSWR('/reviews', fetcher, {
    refreshInterval: 1000 * 60 * 2, // 2 minutes
  })

  const { data: recentReviews, error } = fetchState

  if (error) {
    return <p>Error while fetching reviews data 🤯</p>
  }

  return (
    <S_RecentBookReviews className="recent-book-reviews">
      <header>
        <h3>Avaliações mais recentes</h3>
      </header>
      <ol>
        {recentReviews?.map((review) => (
          <li key={review.id}>
            <ReviewCard {...review} />
          </li>
        ))}
      </ol>
    </S_RecentBookReviews>
  )
}

RecentBookReviews.toString = () => '.recent-book-reviews'

async function fetcher(url: string) {
  return (await api.get<ReviewCardProps[]>(url)).data
}
