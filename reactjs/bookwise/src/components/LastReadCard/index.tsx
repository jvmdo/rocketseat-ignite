import { config } from '@/styles/stitches.config'
import { S_LastReadCard } from './styles'
import { Rating } from 'react-simple-star-rating'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { useMediaQuery } from '@mantine/hooks'
import { ELastRead } from '@/@types/entities'

const { theme, media } = config

export interface LastReadCardProps {
  lastRead: ELastRead
}

export function LastReadCard({ lastRead }: LastReadCardProps) {
  const { setDrawerBook } = useContext(MainLayoutContext)
  const isSmallOrLarger = useMediaQuery(media.sm)

  function handleOpenBookDrawer() {
    setDrawerBook(lastRead.book)
  }

  return (
    <S_LastReadCard role="button" onClick={handleOpenBookDrawer} tabIndex={0}>
      <header>
        <p>
          {formatDistanceToNow(new Date(lastRead.updatedAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
        <Rating
          initialValue={lastRead.book.rating}
          readonly
          allowFraction
          emptyIcon={<Star />}
          emptyColor={theme.colors.purple100}
          fillIcon={<Star weight="fill" />}
          fillColor={theme.colors.purple100}
        />
      </header>
      <hgroup>
        <h3>{lastRead.book.name}</h3>
        <p>{lastRead.book.author}</p>
      </hgroup>
      {isSmallOrLarger && (
        <Image
          src={lastRead.book.coverUrl}
          width={108}
          height={152}
          alt={`Capa de ${lastRead.book.name}`}
        />
      )}
      <p>{lastRead.book.summary}</p>
    </S_LastReadCard>
  )
}
