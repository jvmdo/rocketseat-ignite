import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

type FluidParams = {
  min: number | Stitches.ScaleValue<'fontSizes'>
  max: number | Stitches.ScaleValue<'fontSizes'>
  beginAt?: number | Stitches.ScaleValue<'media'>
  endAt?: number | Stitches.ScaleValue<'media'>
  unit?: string
  viewportUnit?: string // 'vw' | 'vh' | 'cqi' ...
}

type FluidSpaceParams = {
  prop: Stitches.ScaleValue<'space'>
} & FluidParams

export const { styled, css, theme, globalCss, getCssText, config } =
  createStitches({
    theme: {
      colors: {
        white: '#FFF',

        gray900: '#121214',
        gray800: '#202024',
        gray400: '#8d8d99',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',

        imageGradient: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
      },

      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        rg: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        xxl: '2rem',
      },

      radii: {
        sm: '6px',
        rg: '8px',
      },

      sizes: {
        heightHeaderFooter: 'clamp(2rem, 1.405rem + 2.98vmin, 3.25rem)',
        heightMain:
          'calc(100vh - 2 * ($space$pageBlockPadding + $heightHeaderFooter + $space$defaultLayoutGridGap))',
      },

      space: {
        pageBlockPadding: 'clamp(0.75rem, 4.444vh, 5rem)',
        defaultLayoutGridGap: 'clamp(0.5rem, -0.214rem + 3.57vmin, 2rem)',
      },
    },

    media: {
      xxs: '(min-width: 20em)',
      md: '(min-width: 48em)',
      lg: '(min-width: 62em)',
      '3xl': '(min-width: 96em)',
      maxMd: '(width < 48em)',
      maxLg: '(width < 62em)',
    },

    utils: {
      fluidFontSize: ({ ...params }: FluidParams) => ({
        fontSize: clamp({ ...params }),
      }),

      fluidGap: ({ ...params }: FluidParams) => ({
        gap: clamp({ ...params }),
      }),

      fluidSpace: ({ prop, ...params }: FluidSpaceParams) => ({
        [String(prop)]: clamp({ ...params }),
      }),

      gradientDarkSide: (params: { deg: number; endColor: String }) => ({
        background: `linear-gradient(${params.deg}deg, #12121400 0%, ${params.endColor} 100%)`,
      }),
    },
  } as const)

function clamp({
  min,
  max,
  beginAt,
  endAt,
  unit = 'rem',
  viewportUnit = 'vh',
}: FluidParams) {
  min = parseFloat(min.toString())
  max = parseFloat(max.toString())
  beginAt = parseMedia(config.media.xxs)
  endAt = parseMedia(config.media.lg)

  return `clamp(
    ${min}${unit},
    calc(${min}${unit} + (${max} - ${min}) * (100${viewportUnit} - ${beginAt}${unit}) / (${endAt} - ${beginAt})),
    ${max}${unit}
  )`
}

function parseMedia(breakpoint: string) {
  return Number.parseFloat(
    breakpoint.match(/(?<value>\d*\.?\d+)/)?.groups?.value!,
  )
}
