import { DialogTitle } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { About, Book, S_BookDetails } from './styles'
import { BookOpen, BookmarkSimple, Star } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'

const { theme } = config

export function BookDetails() {
  return (
    <S_BookDetails>
      <Book>
        <hgroup>
          <DialogTitle>
            14 Hábitos de Desenvolvedores Altamente Produtivos
          </DialogTitle>
          <p>Zeno Rocha</p>
        </hgroup>
        <Image
          src="/images/books/14-habitos-de-desenvolvedores-altamente-produtivos.png"
          width={171.65}
          height={242}
          alt="title prop here"
        />
        <div className="stars">
          <Rating
            initialValue={4.5}
            readonly
            allowFraction
            emptyIcon={<Star />}
            emptyColor={theme.colors.purple100}
            fillIcon={<Star weight="fill" />}
            fillColor={theme.colors.purple100}
          ></Rating>
          <span>3 avaliações</span>
        </div>
      </Book>
      <About>
        <div>
          <BookmarkSimple />
          <span>Categoria</span>
          <strong>Computação, educação</strong>
        </div>
        <div>
          <BookOpen />
          <span>Páginas</span>
          <strong>160</strong>
        </div>
      </About>
    </S_BookDetails>
  )
}
