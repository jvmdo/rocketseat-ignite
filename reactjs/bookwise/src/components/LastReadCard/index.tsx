import { config } from '@/styles/stitches.config'
import { ComponentProps } from 'react'
import { S_LastReadCard } from './styles'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

const { theme } = config

export interface LastReadCardProps
  extends ComponentProps<typeof S_LastReadCard> {
  imgSrc: string
  title: string
  author: string
  rate: number
  review: string
  date: string
  description: string
}

export function LastReadCard({
  imgSrc = '/images/books/entendendo-algoritmos.png',
  title = 'Entendendo algoritmos',
  author = 'Aditya Bhargava',
  date = '2023-05-21T19:33:12',
  rate = 4,
  review = 'Definitely one of the books in history',
  description = 'A book cover',
}: LastReadCardProps) {
  return (
    <S_LastReadCard>
      <header>
        <p>
          {formatDistanceToNow(new Date(date), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <Rating
          initialValue={rate}
          readonly
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        ></Rating>
      </header>
      <hgroup>
        <h3>{title}</h3>
        <p>{author}</p>
      </hgroup>
      <Image src={imgSrc} width={108} height={152} alt={description} />
      <p>{review}</p>
    </S_LastReadCard>
  )
}
