import React from 'react'
import { S_UserReviews } from './styles'
import { SearchField } from '@/components/SearchField'
import { UserReviewCard } from '../UserReviewCard'
import { formatDistanceToNow } from 'date-fns'

const dateTime = '2023-05-20T10:00:00'

export function UserReviews() {
  return (
    <S_UserReviews className="user-reviews">
      <SearchField placeholder="Buscar livro avaliado" />
      <ol>
        <li>
          <time dateTime={dateTime}>
            {formatDistanceToNow(new Date(dateTime), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </time>
          <ul>
            <li>
              <UserReviewCard />
            </li>
            <li>
              <UserReviewCard />
            </li>
            <li>
              <UserReviewCard />
            </li>
          </ul>
        </li>
        <li>
          <time dateTime={dateTime}>
            {formatDistanceToNow(new Date(dateTime), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </time>
          <ul>
            <li>
              <UserReviewCard />
            </li>
            <li>
              <UserReviewCard />
            </li>
          </ul>
        </li>
        <li>
          <time dateTime={dateTime}>
            {formatDistanceToNow(new Date(dateTime), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </time>
          <li>
            <UserReviewCard />
          </li>
        </li>
      </ol>
    </S_UserReviews>
  )
}

UserReviews.toString = () => '.user-reviews'
