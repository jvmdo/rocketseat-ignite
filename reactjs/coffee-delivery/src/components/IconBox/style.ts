import styled from 'styled-components'
import { ThemeColors, ThemeSizing } from '../../styles/themes/LightTheme'

interface IconBoxContainerProps {
  boxWidth: number
  borderRadius: keyof typeof ThemeSizing
  color: keyof typeof ThemeColors
  backgroundColor: keyof typeof ThemeColors
  hoverBackgroundColor?: keyof typeof ThemeColors
}

const Colors = ThemeColors
const Sizing = ThemeSizing

export const IconBoxContainer = styled.div<IconBoxContainerProps>`
  border-radius: ${(p) => p.theme[Sizing[p.borderRadius]]};
  background-color: ${(p) => p.theme[Colors[p.backgroundColor]]};
  color: ${(p) => p.theme[Colors[p.color]]};
  width: ${(p) => p.boxWidth}rem;
  aspect-ratio: 1 / 1;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: ${(p) => p.theme['ts-hover']};

  &:is(:hover, :focus-visible) {
    background-color: ${(p) =>
      p.hoverBackgroundColor && p.theme[Colors[p.hoverBackgroundColor]]};
    color: ${(p) => p.theme.white};
  }
`
