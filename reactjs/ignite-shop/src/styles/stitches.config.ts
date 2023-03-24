import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

type FluidFontSizeParams = {
  min: number | Stitches.ScaleValue<'fontSizes'>
  max: number | Stitches.ScaleValue<'fontSizes'>
  beginAt?: number | Stitches.ScaleValue<'media'>
  endAt?: number | Stitches.ScaleValue<'media'>
  unit?: string
  viewportUnit?: string // 'vw' | 'vh' | 'cqi' ...
}

export const { styled, css, theme, globalCss, getCssText, config } =
  createStitches({
    theme: {
      colors: {
        white: '#FFF',

        gray900: '#121214',
        gray800: '#202024',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',

        imageGradient: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
      },

      fontSizes: {
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
        vwHeaderFooterHeight: 'clamp(2rem, 1.405rem + 2.98vw, 3.25rem)',
        vhHeaderFooterHeight: 'clamp(2rem, 1.405rem + 2.98vh, 3.25rem)',
        vwMainHeight:
          'calc(100vh - 2 * ($space$pageBlockPadding + $vwHeaderFooterHeight + $space$defaultLayoutGridGap))',
        vhMainHeight:
          'calc(100vh - 2 * ($space$pageBlockPadding + $vhHeaderFooterHeight + $space$defaultLayoutGridGap))',
      },

      space: {
        pageBlockPadding: 'clamp(0.75rem, 4.444vh, 5rem)',
        defaultLayoutGridGap: '0.25rem',
        // TODO: fluid gap based on viewport height
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
      fluidFontSize: ({ ...params }: FluidFontSizeParams) => ({
        fontSize: clamp({ ...params }),
      }),
    },

    // TODO: create util to black gradient params (deg, endColor)
  })

type ClampParams = {
  min: number | Stitches.ScaleValue<'fontSizes'>
  max: number | Stitches.ScaleValue<'fontSizes'>
  beginAt?: number | Stitches.ScaleValue<'media'>
  endAt?: number | Stitches.ScaleValue<'media'>
  unit?: string
  viewportUnit?: string
}

function clamp({
  min,
  max,
  beginAt,
  endAt,
  unit = 'rem',
  viewportUnit = 'vw',
}: ClampParams) {
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
  // TODO: Adapt regex to match floating point numbers
  return Number.parseFloat(breakpoint.match(/(?<value>\d+)/)?.groups?.value!)
}
