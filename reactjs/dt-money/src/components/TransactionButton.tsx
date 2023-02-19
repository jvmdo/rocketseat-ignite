import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import { FluidText } from './FluidText'

const StyledButton = styled.button`
  background-color: ${(p) => p.theme['green-500']};
  border-radius: ${(p) => p.theme.br};
  color: ${(p) => p.theme.white};
  font-weight: ${(p) => p.theme['fw-b']};

  height: var(--height, clamp(2.375rem, 1.919rem + 1.94vw, 3.125rem));
  width: var(--width, auto);
  padding-inline: clamp(1rem, 0.696rem + 1.3vw, 1.5rem);

  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme['green-700']};
    transition: background-color 0.2s;
  }
`

interface ButtonProps {
  children: ReactNode
  height?: string
  width?: string
  fontSizes?: [string, string]
  onClick: () => void
}

export function TransactionButton({
  height,
  width,
  fontSizes = ['0.875rem', '1rem'],
  onClick,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      style={
        {
          '--height': height,
          '--width': width,
        } as CSSProperties
      }
    >
      <FluidText min={fontSizes[0]} max={fontSizes[1]} unit="rem">
        {children}
      </FluidText>
    </StyledButton>
  )
}
