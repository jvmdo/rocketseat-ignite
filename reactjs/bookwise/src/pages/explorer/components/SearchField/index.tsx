import { ComponentProps } from 'react'
import { S_SearchField } from './styles'
import { MagnifyingGlass } from '@phosphor-icons/react'

export interface SearchFieldProps
  extends ComponentProps<typeof S_SearchField> {}

export function SearchField() {
  return (
    <S_SearchField tabIndex={0}>
      <input type="search" placeholder="Buscar livro ou autor" />
      <MagnifyingGlass />
    </S_SearchField>
  )
}
