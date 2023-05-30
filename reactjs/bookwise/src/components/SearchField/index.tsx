import { ComponentProps } from 'react'
import { S_SearchField } from './styles'
import { MagnifyingGlass } from '@phosphor-icons/react'

export interface SearchFieldProps
  extends ComponentProps<typeof S_SearchField> {}

export function SearchField({
  placeholder = 'Buscar livro ou autor',
}: SearchFieldProps) {
  // TODO: is magnifying a submit button?
  // TODO: should the component be a Form?
  return (
    <S_SearchField tabIndex={0} className="search-field">
      <input type="search" placeholder={placeholder} />
      <MagnifyingGlass />
    </S_SearchField>
  )
}

SearchField.toString = () => '.search-field'
