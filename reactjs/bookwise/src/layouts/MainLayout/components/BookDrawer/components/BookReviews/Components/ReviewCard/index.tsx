import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { S_ReviewCard } from './styles'

const { theme } = config

interface ReviewCardProps {
  imgSrc: string
  name: string
  date: string
  rate: number
  review: string
  highlight: boolean
}

export default function ReviewCard({ highlight, ...props }: ReviewCardProps) {
  return (
    <S_ReviewCard color={highlight}>
      <header>
        <div className="user-info">
          <Image src={props.imgSrc} width={40} height={40} alt="" />
          <hgroup>
            <h4>{props.name}</h4>
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
        ></Rating>
      </header>
      <p>{props.review}</p>
    </S_ReviewCard>
  )
}
