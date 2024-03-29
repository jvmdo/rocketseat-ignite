import { config, styled } from '@/styles/stitches.config'
import { ButtonHTMLAttributes, ReactNode } from 'react'

const { fontSizes } = config.theme

const S_BrandButton = styled('button', {
  backgroundColor: '$green500',
  borderRadius: '$rg',
  color: '$white',
  fontWeight: 'bold',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '1rem 2rem 1.25rem',

  '&': {
    // ? A TypeScript error occurs when I use this utils on top level (outside a nesting)
    fluidFontSize: { min: fontSizes.rg, max: fontSizes.md },
  },

  '&:not(:disabled):is(:hover, :focus-visible)': {
    backgroundColor: '$green300',
  },

  '&:disabled': {
    opacity: '60%',
    cursor: 'not-allowed',
  },
})

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

BrandButton.toString = () => '.brand-btn'

export function BrandButton({ children, ...attrs }: BrandButtonProps) {
  return (
    <S_BrandButton className="brand-btn" {...attrs}>
      {children}
    </S_BrandButton>
  )
}
