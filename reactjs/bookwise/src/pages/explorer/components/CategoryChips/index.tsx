import { useState } from 'react'
import { S_CategoryChips, ToggleChip } from './styles'

export interface CategoryChipsProps {
  categories: string[]
  chips: string[]
  onChipsChange: (chips: string[]) => void
}

export const ALL = 'Tudo'

export function CategoryChips({
  categories: initialCategories,
  chips,
  onChipsChange,
}: CategoryChipsProps) {
  const [categories] = useState([ALL, ...initialCategories])

  function handleChipsChange(selectedChips: string[]) {
    const hasSelectedChips = selectedChips.length > 0
    const lastAddedChip = selectedChips.at(-1)

    if (hasSelectedChips && lastAddedChip !== ALL) {
      const chipsWithoutALL = selectedChips.filter((chip) => chip !== ALL)
      return onChipsChange(chipsWithoutALL)
    }

    return onChipsChange([ALL])
  }

  return (
    <S_CategoryChips
      type="multiple"
      value={chips}
      onValueChange={handleChipsChange}
      orientation="horizontal"
    >
      {categories?.map((category) => (
        <ToggleChip key={category} value={category}>
          {category}
        </ToggleChip>
      ))}
    </S_CategoryChips>
  )
}
