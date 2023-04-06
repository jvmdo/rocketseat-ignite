import { config, styled } from '@/styles/stitches.config'
import { ButtonHTMLAttributes, ReactNode } from 'react'

const { fontSizes } = config.theme

const S_BrandButton = styled('button', {
  backgroundColor: 'var(--bg, $green500)',
  borderRadius: '$rg',
  color: '$white',
  fontWeight: 'bold',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  paddingBlock: 'clamp(0.75rem, 0.294rem + 1.94vmin, 1.5rem)',
  paddingInline: '1.5rem',

  '&': {
    // ? A TypeScript error occurs when I use this utils on top level (outside a nesting)
    fluidFontSize: { min: fontSizes.rg, max: fontSizes.md },
  },

  '&:not(:disabled):is(:hover, :focus-visible)': {
    backgroundColor: 'var(--h-bg, $green300)',
  },

  '&:disabled': {
    opacity: '60%',
    cursor: 'not-allowed',
  },

  variants: {
    gray: {
      true: {
        backgroundColor: '$gray400',
        '&:not(:disabled):is(:hover, :focus-visible)': {
          backgroundColor: '$gray300',
        },
      },
    },
  },
})

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variants?: {
    gray: boolean
  }
}

BrandButton.toString = () => '.brand-btn'

export function BrandButton({
  children,
  variants,
  ...attrs
}: BrandButtonProps) {
  return (
    <S_BrandButton className="brand-btn" {...variants} {...attrs}>
      {children}
    </S_BrandButton>
  )
}
