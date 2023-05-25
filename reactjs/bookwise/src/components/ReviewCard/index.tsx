import { ComponentProps, useRef } from 'react'
import { CardBody, CardHeader, S_ReviewCard } from './styles'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import { config } from '@/styles/stitches.config'
import { useParagraphTrimmer } from './useParagraphTrimmer'
import MediaQuery from 'react-responsive'
import { getBreakpoint } from '@/utils/get-breakpoint'

const { theme, media } = config

export interface ReviewCardProps extends ComponentProps<typeof S_ReviewCard> {
  id?: string
  createdAt?: string
  description?: string
  rate?: number
  user?: {
    id?: string
    name?: string
    image?: string
  }
  book?: {
    id?: string
    image?: string
    title?: string
    author?: string
  }
}

export function ReviewCard({
  createdAt = '2023-05-20T18:19:20',
  description = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi praesentium optio soluta beatae molestiae ipsa voluptate id eveniet veritatis reprehenderit. Ipsa magnam officia vitae quas sapiente, qui pariatur temporibus incidunt.',
  rate = 4,
  user = {
    name: 'Jaxson DayZ',
    image: 'https://picsum.photos/200',
  },
  book = {
    image: '/images/books/o-hobbit.png',
    title: 'O Hobbit',
    author: 'J.R.R Tolkien',
  },
}: ReviewCardProps) {
  const paraRef = useRef<HTMLParagraphElement>(null)
  const trimmedText = useParagraphTrimmer(paraRef, description, 3)

  function handleOpenDrawer() {
    console.count('Clicked!')
  }

  return (
    <S_ReviewCard>
      <CardHeader>
        <div className="user-info">
          <Image src={user.image!} width={40} height={40} alt="" />
          <hgroup>
            <h4>{user.name}</h4>
            <p>
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
          </hgroup>
        </div>
        <Rating
          readonly
          initialValue={rate}
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        ></Rating>
      </CardHeader>
      <CardBody>
        <MediaQuery minWidth={getBreakpoint(media.sm)}>
          <Image
            src={book.image!}
            width={108}
            height={152}
            alt={`${book.title} cover`}
            role="button"
            onClick={handleOpenDrawer}
            tabIndex={0}
          />
        </MediaQuery>
        <hgroup>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </hgroup>
        <p ref={paraRef}>
          {trimmedText}
          <span role="button" onClick={handleOpenDrawer} tabIndex={0}>
            {trimmedText !== description && '\u00A0 ver mais'}
          </span>
        </p>
      </CardBody>
    </S_ReviewCard>
  )
}
