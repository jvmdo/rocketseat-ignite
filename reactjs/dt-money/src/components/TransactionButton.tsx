import { CSSProperties, forwardRef, ReactNode } from 'react'
import styled from 'styled-components'
import { FluidText } from './FluidText'

export const StyledButton = styled.button`
  background-color: ${(p) => p.theme['green-500']};
  border-radius: ${(p) => p.theme.br};
  color: ${(p) => p.theme.white};
  font-weight: ${(p) => p.theme['fw-b']};

  height: var(--height, clamp(2.375rem, 1.919rem + 1.94vw, 3.125rem));
  width: var(--width, auto);
  padding-inline: clamp(1rem, 0.696rem + 1.3vw, 1.5rem);

  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(p) => p.theme['green-700']};
    transition: background-color 0.2s;
  }
`

interface ButtonProps {
  children: ReactNode
  height?: string
  width?: string
  fontSizes?: [string, string]
  onClick?: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
  buttonRef?: any
}

function TransactionButtonBones({
  buttonRef,
  height,
  width,
  fontSizes = ['0.875rem', '1rem'],
  onClick,
  type = 'button',
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={
        {
          '--height': height,
          '--width': width,
        } as CSSProperties
      }
    >
      <FluidText min={fontSizes[0]} max={fontSizes[1]}>
        {children}
      </FluidText>
    </StyledButton>
  )
}

export const TransactionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    return <TransactionButtonBones {...props} buttonRef={forwardedRef} />
  },
)

TransactionButton.displayName = 'TransactionButton'
