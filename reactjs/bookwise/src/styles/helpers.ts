import { config } from './stitches.config'
import type { $$ScaleValue } from '@stitches/react'

// Unfortunately, I can't define a type as
// ScaleValue<'space'> | [ScaleValue<'space'>, ScaleValue<'space'>]
// It's related to https://github.com/stitchesjs/stitches/issues/763
type SpaceTokens = {
  '-1': $$ScaleValue
  $0: $$ScaleValue
  $1: $$ScaleValue
  $2: $$ScaleValue
  $3: $$ScaleValue
  $4: $$ScaleValue
  $5: $$ScaleValue
  $6: $$ScaleValue
  $7: $$ScaleValue
  $8: $$ScaleValue
  $10: $$ScaleValue
  $12: $$ScaleValue
  $14: $$ScaleValue
  $16: $$ScaleValue
  $18: $$ScaleValue
  $24: $$ScaleValue
}
export type LogicalValue =
  | keyof SpaceTokens
  | [keyof SpaceTokens, keyof SpaceTokens]

export function formatLogicalProp(scale: LogicalValue, factor?: boolean) {
  let padding

  if (Array.isArray(scale)) {
    padding = `${scale[0]} ${scale[1]}`
  } else {
    if (factor) {
      padding = `calc(-1 * ${String(scale)})`
    } else {
      padding = String(scale)
    }
  }

  return padding
}

type ViewportUnits =
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'dvh'
  | 'cqw'
  | 'cqh'
  | 'cqmin'
  | 'cqmax'

export type FluidFontSize = {
  min: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  max: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  beginAt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  endAt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  unit?: 'rem'
  viewportUnit?: ViewportUnits
}

export function clamp({
  min,
  max,
  beginAt = 'xs',
  endAt = 'lg',
  unit = 'rem',
  viewportUnit = 'vw',
}: FluidFontSize) {
  const a = parseFloat(config.theme.fontSizes[min])
  const b = parseFloat(config.theme.fontSizes[max])
  const x = parseMedia(config.media[beginAt])
  const y = parseMedia(config.media[endAt])

  return `clamp(
    ${a}${unit},calc(${a}${unit} + (${b} - ${a}) * (100${viewportUnit} - ${x}${unit}) / (${y} - ${x})),
    ${b}${unit}
  )`
}

function parseMedia(breakpoint: string) {
  return Number.parseFloat(
    String(breakpoint).match(/(?<value>\d*\.?\d+)/)?.groups?.value!,
  )
}
