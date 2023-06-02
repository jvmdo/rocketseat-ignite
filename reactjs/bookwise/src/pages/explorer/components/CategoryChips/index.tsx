import useSWR from 'swr'
import { S_CategoryChips, ToggleChip } from './styles'
import { api } from '@/lib/axios'

export interface CategoryChipsProps {
  chips: string[]
  onChipsChange: (chips: string[]) => void
}

export const ALL = 'Tudo'

export function CategoryChips({ chips, onChipsChange }: CategoryChipsProps) {
  const results = useSWR('categories', fetcher, {
    onSuccess(data) {
      data.unshift(ALL) // Insert [ALL] in the first [categories] position
    },
  })

  const { data: categories, isLoading, error } = results

  function handleChipsChange(selectedChips: string[]) {
    const hasSelectedChips = selectedChips.length > 0
    const lastAddedChip = selectedChips.at(-1)

    if (hasSelectedChips && lastAddedChip !== ALL) {
      const chipsWithoutALL = selectedChips.filter((chip) => chip !== ALL)
      return onChipsChange(chipsWithoutALL)
    }

    return onChipsChange([ALL])
  }

  if (error) {
    return <p>Could retrieve list of tags</p>
  }

  return (
    <S_CategoryChips
      type="multiple"
      value={chips}
      onValueChange={handleChipsChange}
      orientation="horizontal"
      withLoadingBar={isLoading}
    >
      {categories?.map((category) => (
        <ToggleChip key={category} value={category}>
          {category}
        </ToggleChip>
      ))}
    </S_CategoryChips>
  )
}

async function fetcher() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (await api.get<string[]>('/books/categories')).data
}
