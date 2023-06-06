import { DialogTitle } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { About, Book, S_BookDetails } from './styles'
import { BookOpen, BookmarkSimple, Star } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { BookCardProps } from '@/components/BookCard'

const { theme } = config

export function BookDetails(props: BookCardProps) {
  return (
    <S_BookDetails>
      <Book>
        <hgroup>
          <DialogTitle>{props.name}</DialogTitle>
          <p>{props.author}</p>
        </hgroup>
        <Image
          src={props.coverUrl}
          width={171.65}
          height={242}
          alt={`Capa de ${props.name}`}
        />
        <div className="stars">
          <Rating
            initialValue={props.rating}
            readonly
            allowFraction
            emptyIcon={<Star />}
            emptyColor={theme.colors.purple100}
            fillIcon={<Star weight="fill" />}
            fillColor={theme.colors.purple100}
          />
          <span>{props.totalReviews} avaliações</span>
        </div>
      </Book>
      <About>
        <div>
          <BookmarkSimple />
          <span>Categoria</span>
          <strong>{props.categories.join(', ')}</strong>
        </div>
        <div>
          <BookOpen />
          <span>Páginas</span>
          <strong>{props.totalPages}</strong>
        </div>
      </About>
    </S_BookDetails>
  )
}
