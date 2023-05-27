import { useState } from 'react'
import { S_CategoryChips, ToggleChip } from './styles'

export interface CategoryChipsProps {}

const ALL = 'Tudo'
const categories = [ALL, 'Computação', 'Educação', 'Fantasia', 'HQs']

export function CategoryChips(props: CategoryChipsProps) {
  const [chips, setChips] = useState([ALL])

  function handleChipsChange(selectedChips: string[]) {
    const hasSelectedChips = selectedChips.length > 0
    const lastAddedChip = selectedChips.at(-1)

    if (hasSelectedChips && lastAddedChip !== ALL) {
      const chipsWithoutALL = selectedChips.filter((chip) => chip !== ALL)
      return setChips(chipsWithoutALL)
    }

    return setChips([ALL])
  }

  return (
    <S_CategoryChips
      type="multiple"
      value={chips}
      onValueChange={handleChipsChange}
      orientation="horizontal"
    >
      {categories.map((category) => (
        <ToggleChip key={category} value={category}>
          {category}
        </ToggleChip>
      ))}
    </S_CategoryChips>
  )
}
