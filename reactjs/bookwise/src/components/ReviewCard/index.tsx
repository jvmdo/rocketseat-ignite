import { useContext, useRef, MouseEvent, FocusEvent } from 'react'
import { CardBody, CardHeader, S_ReviewCard } from './styles'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import { config } from '@/styles/stitches.config'
import { useParagraphTrimmer } from './useParagraphTrimmer'
import { LinkWrapper } from '../LinkWrapper'
import { BookCardProps } from '../BookCard'
import { useMediaQuery } from '@mantine/hooks'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { formatInitials } from '@/utils/format-initials'

const { theme, media } = config

export interface ReviewCardProps {
  id: string
  createdAt: Date
  description: string
  rate: number
  user: {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
  }
  book: BookCardProps
}

export function ReviewCard(props: ReviewCardProps) {
  const paraRef = useRef<HTMLParagraphElement>(null)
  const trimmedText = useParagraphTrimmer(paraRef, props.description, 3)
  const isSmallOrLarger = useMediaQuery(media.sm)
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(props.book)
  }

  function handleActiveState(
    event: MouseEvent<HTMLImageElement> | FocusEvent<HTMLImageElement>,
  ) {
    event.type === 'mousedown'
      ? event.currentTarget.classList.add('active')
      : event.currentTarget.classList.remove('active')
  }

  return (
    <S_ReviewCard>
      <CardHeader>
        <div className="user-info">
          <LinkWrapper href={`/profile/${props.user.id}`} size="round">
            <Image
              src={props.user.image ?? ''}
              width={40}
              height={40}
              alt={formatInitials(props.user.name)}
            />
          </LinkWrapper>
          <hgroup>
            <LinkWrapper href={`/profile/${props.user.id}`} type="text">
              <h4>{props.user.name}</h4>
            </LinkWrapper>
            <p>
              {formatDistanceToNow(new Date(props.createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
          </hgroup>
        </div>
        <Rating
          readonly
          initialValue={props.book.rating}
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
            src={props.book.coverUrl}
            width={108}
            height={152}
            alt={`Capa de ${props.book.name}`}
            role="button"
            onClick={handleOpenBookDrawer}
            tabIndex={0}
            onBlur={handleActiveState}
            onMouseDown={handleActiveState}
          />
        )}
        <hgroup role="button" onClick={handleOpenBookDrawer} tabIndex={0}>
          <h4>{props.book.name}</h4>
          <p>{props.book.author}</p>
        </hgroup>
        <p ref={paraRef}>
          {trimmedText}
          <span role="button" onClick={handleOpenBookDrawer} tabIndex={0}>
            {trimmedText !== props.description && '\u00A0 ver mais'}
          </span>
        </p>
      </CardBody>
    </S_ReviewCard>
  )
}
