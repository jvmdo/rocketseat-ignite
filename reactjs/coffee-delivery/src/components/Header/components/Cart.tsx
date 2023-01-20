import { ReactNode } from 'react'
import styled from 'styled-components'

interface CartProps {
  children: ReactNode
  number: number
}

export function Cart({ children, number }: CartProps) {
  return <CartContainer number={number}>{children}</CartContainer>
}

interface CartContainerProps {
  number: number
}

const CartContainer = styled.div<CartContainerProps>`
  position: relative;

  &::after {
    ${({ number }) => number && `content: "${number}"`};
    position: absolute;
    top: -0.5rem;
    right: -0.625rem;
    background-color: ${(p) => p.theme['yellow-dark']};
    border-radius: 100%;
    color: ${(p) => p.theme.white};
    font-size: ${(p) => p.theme['fs-b-xs']};
    font-weight: ${(p) => p.theme['fw-bd']};
    aspect-ratio: 1 / 1;
    min-width: 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`
