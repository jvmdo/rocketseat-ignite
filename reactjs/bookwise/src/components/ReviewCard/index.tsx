import { useContext, MouseEvent, FocusEvent } from 'react'
import { CardBody, CardHeader, S_ReviewCard, SeeMore } from './styles'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import { config } from '@/styles/stitches.config'
import { LinkWrapper } from '../LinkWrapper'
import { useMediaQuery } from '@mantine/hooks'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { formatInitials } from '@/utils/format-initials'
import { useTextTrimmer } from './useTextTrimmer'
import { EReview } from '@/@types/entities'

const { theme, media } = config

export interface ReviewCardProps {
  review: EReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { ref: paraRef, trimmedText } = useTextTrimmer(review.description, 2)
  const isSmallOrLarger = useMediaQuery(media.sm)
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(review.book)
  }

  function handleActiveState(
    event: MouseEvent<HTMLImageElement> | FocusEvent<HTMLImageElement>,
  ) {
    event.type === 'mousedown'
      ? event.currentTarget.classList.add('active')
      : event.currentTarget.classList.remove('active')
  }

  const shouldDisplaySeeMore = trimmedText !== review.description

  return (
    <S_ReviewCard>
      <CardHeader>
        <div className="user-info">
          <LinkWrapper href={`/profile/${review.user.id}`} size="round">
            <Image
              src={review.user.image ?? ''}
              width={40}
              height={40}
              alt={formatInitials(review.user.name)}
            />
          </LinkWrapper>
          <hgroup>
            <LinkWrapper href={`/profile/${review.user.id}`} type="text">
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
          initialValue={review.book.rating}
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        />
      </CardHeader>
      <CardBody>
        {isSmallOrLarger && (
          <Image
            src={review.book.coverUrl}
            width={108}
            height={152}
            alt={`Capa de ${review.book.name}`}
            role="button"
            onClick={handleOpenBookDrawer}
            tabIndex={0}
            onBlur={handleActiveState}
            onMouseDown={handleActiveState}
          />
        )}
        <hgroup role="button" onClick={handleOpenBookDrawer} tabIndex={0}>
          <h4>{review.book.name}</h4>
          <p>{review.book.author}</p>
        </hgroup>
        <p ref={paraRef}>
          {trimmedText}
          {shouldDisplaySeeMore && (
            <SeeMore onClick={handleOpenBookDrawer}>
              {'\u00A0 ver mais'}
            </SeeMore>
          )}
        </p>
      </CardBody>
    </S_ReviewCard>
  )
}
