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
import { EBookReview } from '@/@types/entities'

interface BookReviewsProps {
  bookId: string | undefined
}

export function BookReviews({ bookId }: BookReviewsProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const fetchState = useSWR(() => shouldFetch(bookId), fetcher)
  const { status, data: session } = useSession()
  const { setDialogOpen } = useContext(MainLayoutContext)

  function handleCollapsibleClick(event: MouseEvent<HTMLButtonElement>) {
    if (status !== 'authenticated') {
      event.preventDefault()
      return setDialogOpen(true)
    }
  }

  const { data: reviews, isLoading, mutate } = fetchState

  const userReviewExists = Boolean(
    reviews?.find(({ user }) => user.id === session?.user.id),
  )

  if (isLoading) {
    return <p>Loading reviews 🔃</p>
  }

  return (
    <S_BookReviews>
      <CollapsibleRoot>
        <header>
          <h3>Avaliações</h3>
          <CollapsibleTrigger
            ref={triggerRef}
            onClick={handleCollapsibleClick}
            blocked={userReviewExists}
          >
            {userReviewExists ? 'Avaliado' : 'Avaliar'}
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
              review={review}
              highlight={review.user.id === session?.user.id}
            />
          </li>
        ))}
      </ReviewCardsList>
    </S_BookReviews>
  )
}

function shouldFetch(bookId: string | undefined) {
  if (!bookId) {
    console.warn('[BookReviews] fetch failed, [bookId] is undefined')
    return null
  }

  return `/books/${bookId}/reviews`
}

async function fetcher(url: string) {
  return (await api.get<EBookReview[]>(url)).data
}
