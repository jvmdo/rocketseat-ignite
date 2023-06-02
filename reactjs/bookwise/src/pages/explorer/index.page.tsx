import { Binoculars } from '@phosphor-icons/react'
import { S_Explorer } from './styles'
import { SearchField } from '../../components/SearchField'
import { ALL, CategoryChips } from './components/CategoryChips'
import { BooksGallery } from './components/BooksGallery'
import { GetStaticProps } from 'next'
import { api } from '@/lib/axios'
import { SWRConfig } from 'swr'
import { BookCardProps } from '@/components/BookCard'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const SearchFormSchema = z.object({ search: z.string() })
type SearchFormData = z.infer<typeof SearchFormSchema>

export interface ExplorerProps {
  fallback: { '/books': BookCardProps[] }
}

export default function Explorer({ fallback }: ExplorerProps) {
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(SearchFormSchema),
  })
  const [search, setSearch] = useState<string>('')
  const [chips, setChips] = useState([ALL])

  function handleSearchInput({ search }: SearchFormData) {
    setSearch(search)
  }

  function handleChipsInput(chips: string[]) {
    setChips(chips)
  }

  const tags = chips.filter((chip) => chip !== ALL)

  return (
    <SWRConfig value={{ fallback }}>
      <S_Explorer>
        <header>
          <hgroup>
            <Binoculars />
            <h1>Explorar</h1>
          </hgroup>
          <form role="search" onSubmit={handleSubmit(handleSearchInput)}>
            <SearchField register={register('search')} />
          </form>
        </header>
        <CategoryChips chips={chips} onChipsChange={handleChipsInput} />
        <BooksGallery search={search} tags={tags} />
      </S_Explorer>
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const booksResponse = await api.get('/books')

    return {
      props: {
        fallback: {
          '/books': booksResponse.data,
        },
      },
      revalidate: 600, // 10 minutes
    }
  } catch (err) {
    return {
      props: {
        fallback: {
          '/books': [],
        },
      },
      revalidate: 5,
    }
  }
}
