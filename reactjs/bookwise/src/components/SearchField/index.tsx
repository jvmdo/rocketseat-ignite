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
  disabled?: boolean
}

export function SearchField({
  register,
  disabled,
  placeholder = 'Buscar livro ou autor',
  ...props
}: SearchFieldProps) {
  return (
    <S_SearchField tabIndex={0} {...props}>
      <input
        type="search"
        {...register}
        disabled={disabled}
        placeholder={placeholder}
      />
      <MagnifyingGlass />
    </S_SearchField>
  )
}
