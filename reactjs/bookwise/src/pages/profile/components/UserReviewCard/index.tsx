import React from 'react'
import { CardBody, CardHead, S_UserReviewCard } from './styles'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Star } from '@phosphor-icons/react'

const { theme } = config

export interface UserReviewCardProps {
  imgSrc?: string
  title?: string
  author?: string
  rate?: number
  description?: string
  read?: boolean
}

export function UserReviewCard({
  imgSrc = '/images/books/o-fim-da-eternidade.png',
  title = 'O fim da eternidade',
  author = 'Isaac Asimov',
  rate = 4,
  description = 'One of the books in history',
  read = false,
}: UserReviewCardProps) {
  return (
    <S_UserReviewCard>
      <CardHead>
        <Image src={imgSrc} width={98} height={134} alt={description} />
        <hgroup>
          <h3>{title}</h3>
          <p>{author}</p>
        </hgroup>
        <Rating
          initialValue={rate}
          readonly
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        ></Rating>
      </CardHead>
      <CardBody>
        Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae
        non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla ut et
        suspendisse enim suspendisse vitae. Leo non eget lacus sollicitudin
        tristique pretium quam. Mollis et luctus amet sed convallis varius massa
        sagittis. Proin sed proin at leo quis ac sem. Nam donec accumsan
        curabitur amet tortor quam sit. Bibendum enim sit dui lorem urna amet
        elit rhoncus ut. Aliquet euismod vitae ut turpis. Aliquam amet integer
        pellentesque.
      </CardBody>
    </S_UserReviewCard>
  )
}
