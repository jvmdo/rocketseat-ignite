import { MouseEvent, useState } from 'react'
import styled from 'styled-components'

interface FilterTagProps {
  name: string
  onFilter: (tag: string) => void
}

export function FilterTag({ name, onFilter }: FilterTagProps) {
  const [isSelected, setIsSelected] = useState(false)

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onFilter(name)
    setIsSelected(!isSelected)
    event.currentTarget.classList.toggle('active')
  }

  return (
    <FilterTagSkin type="button" onClick={handleClick}>
      {name}
    </FilterTagSkin>
  )
}

const FilterTagSkin = styled.button`
  border: 1px solid ${(p) => p.theme.yellow};
  border-radius: 100vw;
  color: ${(p) => p.theme['yellow-dark']};
  font-size: ${(p) => p.theme['fs-b-xxs']};
  font-weight: ${(p) => p.theme['fw-bd']};
  text-transform: uppercase;
  padding-inline: 0.75rem;
  height: 1.5rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  transition: ${(p) => p.theme['ts-hover']};

  &:is(:hover, :focus-visible) {
    background-color: ${(p) => p.theme['yellow-dark']};
    color: ${(p) => p.theme.white};
  }

  &.active {
    background-color: ${(p) => p.theme.yellow};
    color: ${(p) => p.theme.white};
  }
`
