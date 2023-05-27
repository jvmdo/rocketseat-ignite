import { Binoculars } from '@phosphor-icons/react'
import { S_Explorer } from './styles'
import { SearchField } from './components/SearchField'
import { CategoryChips } from './components/CategoryChips'
import { BooksGallery } from './components/BooksGallery'

export interface ExplorerProps {}

export function Explorer() {
  return (
    <S_Explorer>
      <header>
        <hgroup>
          <Binoculars />
          <h1>Explorar</h1>
        </hgroup>
        <SearchField />
      </header>
      <CategoryChips />
      <BooksGallery />
    </S_Explorer>
  )
}
