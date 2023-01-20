import { ReactNode } from 'react'
import { ThemeColors, ThemeSizing } from '../../styles/themes/LightTheme'
import { IconBoxContainer } from './style'

interface IconBoxProps {
  children: ReactNode
  boxWidth: number
  borderRadius?: keyof typeof ThemeSizing
  color: keyof typeof ThemeColors
  backgroundColor: keyof typeof ThemeColors
  hoverBackgroundColor?: keyof typeof ThemeColors
}

export function IconBox({
  children,
  borderRadius = 'brRg',
  ...props
}: IconBoxProps) {
  return (
    <IconBoxContainer borderRadius={borderRadius} {...props}>
      {children}
    </IconBoxContainer>
  )
}
