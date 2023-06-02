import Image from 'next/image'
import { ReadTag, S_BookCard } from './styles'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import { config } from '@/styles/stitches.config'
import { ComponentProps, useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

const { theme } = config

export interface BookCardProps
  extends Pick<ComponentProps<typeof S_BookCard>, 'size'> {
  id: string
  name: string
  author: string
  coverUrl: string
  rating: number
  totalReviews: number
  categories: string[]
  totalPages: number
  createdAt: Date
  summary: string
  userHasRead: boolean
}

export function BookCard({ size, ...props }: BookCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)

  function handleOpenBookDrawer() {
    setDrawerBook(props)
  }

  return (
    <S_BookCard
      role="button"
      tabIndex={0}
      onClick={handleOpenBookDrawer}
      title={`${props.name} por ${props.author}`}
      className="book-card"
      size={size}
    >
      <Image src={props.coverUrl} width={108} height={152} alt="" />
      <hgroup>
        <h4>{props.name}</h4>
        <p>{props.author}</p>
      </hgroup>
      <Rating
        initialValue={props.rating}
        readonly
        allowFraction
        emptyIcon={<Star />}
        emptyColor={theme.colors.purple100}
        fillIcon={<Star weight="fill" />}
        fillColor={theme.colors.purple100}
      ></Rating>
      {props.userHasRead && <ReadTag>Lido</ReadTag>}
    </S_BookCard>
  )
}

BookCard.toString = () => '.book-card'
