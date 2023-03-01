import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoint } from '../styles/global'

interface StyledTextProps {
  min: number
  max: number
  from: number
  to: number
  unit: string
  bold: boolean
  color?: string
}

const StyledText = styled.span<StyledTextProps>`
  color: ${(p) => p.color};
  font-size: ${({ min, max, from, to, unit }) => `clamp(
    ${min}${unit},
    calc(
      ${min}${unit} + (${max} - ${min}) * (100vw - ${from}${unit}) / (${to} -
            ${from})
    ),
    ${max}${unit}
  )`};
  font-weight: ${(p) => p.bold && p.theme['fw-bold']};
`

interface FluidTextProps {
  min: string
  max: string
  bold?: boolean
  color?: string
  from?: number
  to?: number
  unit?: string
  children: ReactNode
}

export function FluidText({
  min,
  max,
  bold = false,
  color,
  children,
  unit = 'rem',
  from = Number.parseFloat(breakpoint.xs),
  to = Number.parseFloat(breakpoint.lg),
}: FluidTextProps) {
  const minN = Number.parseFloat(min)
  const maxN = Number.parseFloat(max)

  return (
    <StyledText {...{ min: minN, max: maxN, from, to, unit, bold, color }}>
      {children}
    </StyledText>
  )
}
