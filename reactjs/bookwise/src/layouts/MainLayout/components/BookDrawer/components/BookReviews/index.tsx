import { useContext, useRef, MouseEvent } from 'react'
import ReviewCard from './Components/ReviewCard'
import { ReviewForm } from './Components/ReviewForm'
import { Root as CollapsibleRoot } from '@radix-ui/react-collapsible'
import {
  CollapsibleContent,
  CollapsibleTrigger,
  ReviewCardsList,
  S_BookReviews,
} from './styles'
import { api } from '@/lib/axios'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

export type BookReview = {
  id: string
  createdAt: string
  description: string
  rate: number
  user: {
    id: string
    name: string
    image: string
  }
}

export function BookReviews({ bookId }: { bookId: string }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const results = useSWR(`/books/${bookId}/reviews`, fetcher)
  const { status, data: session } = useSession()
  const { setDialogOpen } = useContext(MainLayoutContext)

  function handleCollapsibleClick(event: MouseEvent<HTMLButtonElement>) {
    if (status !== 'authenticated') {
      event.preventDefault()
      return setDialogOpen(true)
    }
  }

  const { data: reviews, isLoading, error, mutate } = results

  if (error) {
    return <p>Could not retrieve this book`s reviews 😔</p>
  }

  if (isLoading) {
    return <p>Loading reviews 🤚</p>
  }

  return (
    <S_BookReviews>
      <CollapsibleRoot>
        <header>
          <h3>Avaliações</h3>
          <CollapsibleTrigger ref={triggerRef} onClick={handleCollapsibleClick}>
            Avaliar
          </CollapsibleTrigger>
        </header>
        <CollapsibleContent>
          <ReviewForm
            triggerRef={triggerRef}
            bookId={bookId}
            reviews={reviews}
            mutate={mutate}
          />
        </CollapsibleContent>
      </CollapsibleRoot>
      <ReviewCardsList>
        {reviews?.map((review) => (
          <li key={review.id}>
            <ReviewCard
              imgSrc={review.user.image}
              name={review.user.name}
              date={review.createdAt}
              rate={review.rate}
              review={review.description}
              highlight={review.user.id === session?.user.id}
            />
          </li>
        ))}
      </ReviewCardsList>
    </S_BookReviews>
  )
}

async function fetcher(url: string) {
  return (await api.get<BookReview[]>(url)).data
}
