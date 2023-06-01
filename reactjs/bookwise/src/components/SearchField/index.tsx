import { ComponentProps, Ref } from 'react'
import { S_SearchField } from './styles'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { ChangeHandler } from 'react-hook-form'

export interface SearchFieldProps extends ComponentProps<typeof S_SearchField> {
  register: {
    name: string
    onChange: ChangeHandler
    onBlur: ChangeHandler
    ref: Ref<any>
  }
}

export function SearchField({
  register,
  placeholder = 'Buscar livro ou autor',
  ...props
}: SearchFieldProps) {
  // TODO: is magnifying a submit button? If so, change to X to act as reset
  return (
    <S_SearchField tabIndex={0} {...props}>
      <input type="search" placeholder={placeholder} {...register} />
      <MagnifyingGlass />
    </S_SearchField>
  )
}
