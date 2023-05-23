import { config } from './stitches.config'
import type { $$ScaleValue } from '@stitches/react'

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

// Unfortunately, I can't define a type as
// ScaleValue<'space'> | [ScaleValue<'space'>, ScaleValue<'space'>]
// It's related to https://github.com/stitchesjs/stitches/issues/763
type SpaceTokens = {
  $px: $$ScaleValue
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
  $16: $$ScaleValue
}
export type LogicalValue =
  | keyof SpaceTokens
  | [keyof SpaceTokens, keyof SpaceTokens]

// Cannot use because of declaration-call order
// keyof typeof config.theme.fontSizes
// keyof typeof config.media

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
    ${a}${unit},
    calc(${a}${unit} + (${b} - ${a}) * (100${viewportUnit} - ${x}${unit}) / (${y} - ${x})),
    ${b}${unit}
  )`
}

function parseMedia(breakpoint: string) {
  return Number.parseFloat(
    String(breakpoint).match(/(?<value>\d*\.?\d+)/)?.groups?.value!,
  )
}

export function formatLogicalProp(scale: LogicalValue) {
  // const values = String(scale).split(' ')
  let padding

  if (Array.isArray(scale)) {
    padding = `${scale[0]} ${scale[1]}`
  } else {
    padding = String(scale)
  }

  // if (values.length === 1) {
  //   padding = values[0]
  // } else if (values.length >= 2) {
  //   padding = `${values[0]} ${values[1]}`
  // }

  return padding
}
