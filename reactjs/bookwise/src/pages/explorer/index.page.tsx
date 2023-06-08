import { Binoculars } from '@phosphor-icons/react'
import { S_Explorer } from './styles'
import { SearchField } from '../../components/SearchField'
import { ALL, CategoryChips } from './components/CategoryChips'
import { BooksGallery } from './components/BooksGallery'
import { GetStaticProps } from 'next'
import { api } from '@/lib/axios'
import { SWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { EBook } from '@/@types/entities'

const SearchFormSchema = z.object({ search: z.string() })
type SearchFormData = z.infer<typeof SearchFormSchema>

export interface ExplorerProps {
  books: EBook[]
  categories: string[]
}

export default function Explorer({ books, categories }: ExplorerProps) {
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(SearchFormSchema),
  })
  const [search, setSearch] = useState('')
  const [chips, setChips] = useState([ALL])
  const [isLoading, setIsLoading] = useState(false)

  function handleSearchInput({ search }: SearchFormData) {
    setSearch(search)
  }

  function handleChipsInput(chips: string[]) {
    setChips(chips)
  }

  const fallback = { '/books': books }
  const tags = chips.filter((chip) => chip !== ALL)

  return (
    <S_Explorer>
      <header>
        <hgroup>
          <Binoculars />
          <h1>Explorar</h1>
        </hgroup>
        <form role="search" onSubmit={handleSubmit(handleSearchInput)}>
          <SearchField
            register={register('search')}
            disabled={isLoading}
            autoFocus
          />
        </form>
      </header>
      <CategoryChips
        categories={categories}
        chips={chips}
        onChipsChange={handleChipsInput}
      />
      <SWRConfig value={{ fallback }}>
        <BooksGallery search={search} tags={tags} setIsLoading={setIsLoading} />
      </SWRConfig>
    </S_Explorer>
  )
}

export const getStaticProps: GetStaticProps<ExplorerProps> = async () => {
  try {
    // TODO: do not use API Route
    const books = (await api.get<EBook[]>('/books')).data
    const categories = (await api.get<string[]>('/books/categories')).data

    return {
      props: { books, categories },
      revalidate: 600, // 10 minutes
    }
  } catch (err) {
    return {
      props: {
        books: [],
        categories: [],
      },
      revalidate: 5,
    }
  }
}
