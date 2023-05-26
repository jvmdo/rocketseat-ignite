import { useRef } from 'react'
import ReviewCard from './Components/ReviewCard'
import { ReviewForm } from './Components/ReviewForm'
import { Root as CollapsibleRoot } from '@radix-ui/react-collapsible'
import {
  CollapsibleContent,
  CollapsibleTrigger,
  ReviewCardsList,
  S_BookReviews,
} from './styles'

export function BookReviews() {
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <S_BookReviews>
      <CollapsibleRoot>
        <header>
          <h3>Avaliações</h3>
          <CollapsibleTrigger ref={triggerRef}>Avaliar</CollapsibleTrigger>
        </header>
        <CollapsibleContent>
          <ReviewForm triggerRef={triggerRef} />
        </CollapsibleContent>
      </CollapsibleRoot>
      <ReviewCardsList>
        <li>
          <ReviewCard
            imgSrc="https://picsum.photos/200"
            name="Brandom Botosh"
            date="2023-05-20T12:58:00"
            rate={4}
            review="Nec tempor nunc in egestas."
          />
        </li>
        <li>
          <ReviewCard
            imgSrc="https://picsum.photos/200"
            name="Brandom Botosh"
            date="2023-05-20T12:58:00"
            rate={4}
            review="Nec tempor nunc in egestas."
          />
        </li>
        <li>
          <ReviewCard
            imgSrc="https://picsum.photos/200"
            name="Brandom Botosh"
            date="2023-05-20T12:58:00"
            rate={4}
            review="Nec tempor nunc in egestas."
          />
        </li>
      </ReviewCardsList>
    </S_BookReviews>
  )
}
