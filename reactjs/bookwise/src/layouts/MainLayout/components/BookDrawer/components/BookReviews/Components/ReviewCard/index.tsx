import React, { useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { S_ReviewCard } from './styles'
import { formatInitials } from '@/utils/format-initials'
import { LinkWrapper } from '@/components/LinkWrapper'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

const { theme } = config

// TODO: isn't better to use that other interface?
interface ReviewCardProps {
  userId: string
  imgSrc: string
  name: string
  date: string
  rate: number
  review: string
  highlight: boolean
}

export default function ReviewCard({ highlight, ...props }: ReviewCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleBookDrawerClose() {
    setDrawerBook(undefined)
  }

  return (
    <S_ReviewCard color={highlight}>
      <header>
        <div className="user-info">
          <LinkWrapper
            href={`/profile/${props.userId}`}
            size="round"
            onClick={handleBookDrawerClose}
          >
            <Image
              src={props.imgSrc}
              width={40}
              height={40}
              alt={formatInitials(props.name)}
            />
          </LinkWrapper>
          <hgroup>
            <LinkWrapper
              href={`/profile/${props.userId}`}
              type="text"
              onClick={handleBookDrawerClose}
            >
              <h4>{props.name}</h4>
            </LinkWrapper>
            <p>
              {formatDistanceToNow(new Date(props.date), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
          </hgroup>
        </div>
        <Rating
          readonly
          initialValue={props.rate}
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        />
      </header>
      <p>{props.review}</p>
    </S_ReviewCard>
  )
}
