import React, { useState } from 'react'
import { S_UserReviews } from './styles'
import { SearchField } from '@/components/SearchField'
import { UserReviewCard } from './components/UserReviewCard'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useSWR from 'swr'
import { api } from '@/lib/axios'
import { EReviewGroup } from '@/@types/entities'

const SearchFormSchema = z.object({
  search: z.string(),
})

type SearchFormData = z.infer<typeof SearchFormSchema>

interface UserReviewsProps {
  userId: string
  userName: string | null
}

export function UserReviews({ userId, userName }: UserReviewsProps) {
  const [search, setSearch] = useState('')
  const { data: reviewGroups, isLoading } = useSWR([userId, search], fetcher, {
    keepPreviousData: true,
  })
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(SearchFormSchema),
  })

  function handleSearchReview(data: SearchFormData) {
    setSearch(data.search)
  }

  if (isLoading) {
    return <p>Carregando avaliações 🔃</p>
  }

  if (isEmpty(reviewGroups) && search === '') {
    return <p>Nenhuma avaliação escrita 😿</p>
  }

  return (
    <S_UserReviews className="user-reviews">
      <form role="search" onSubmit={handleSubmit(handleSearchReview)}>
        <SearchField
          register={register('search')}
          disabled={isLoading}
          placeholder="Buscar livro avaliado"
          autoFocus={true}
        />
      </form>
      {isEmpty(reviewGroups) ? (
        <p>Nenhuma avaliação encontrada para o termo buscado</p>
      ) : (
        <ol>
          {reviewGroups?.map(({ interval, reviews }) => {
            // No reviews for that interval
            if (reviews?.length === 0) return null

            return (
              <li key={interval}>
                <p>{interval}</p>
                <ul>
                  {reviews?.map((review) => (
                    <li key={review.id}>
                      <UserReviewCard userName={userName} review={review} />
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      )}
    </S_UserReviews>
  )
}

UserReviews.toString = () => '.user-reviews'

type SwrKey = [userId: string, search?: string]

async function fetcher(key: SwrKey) {
  const url = formatUrl(key)

  return (await api.get<EReviewGroup[]>(url)).data
}

function formatUrl([userId, search]: SwrKey) {
  const params = new URLSearchParams()

  if (search) {
    params.append('search', search)
  }

  const queryString = params.toString()

  return `/users/${userId}/reviews` + (queryString ? `?${queryString}` : '')
}

function isEmpty(reviewGroups: EReviewGroup[] | undefined) {
  return reviewGroups?.every(({ reviews }) => reviews.length === 0) ?? true
}
