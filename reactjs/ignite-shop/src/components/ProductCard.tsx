import { config, styled } from '@/styles/stitches.config'
import { ProductHero as CardThumbnail } from './ProductHero'

const { fontSizes } = config.theme

/* 
  Styles
*/
const S_CardTooltip = styled('div', {
  backgroundColor: '$gray800',
  borderRadius: '$sm',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',

  // TODO: check if min(clamp, auto) handles big names
  // TODO: try viewport unit
  height: 'clamp(4rem, 2.571rem + 7.14vw, 6rem)',
  margin: '0.25rem',
  // TODO: fluid this
  padding: '1rem 2rem',

  position: 'absolute',
  bottom: 0,
  insetInline: 0,
  transform: 'translateY(150%)',
  transition: 'transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)',

  /* No translate behavior for touchscreens devices */
  '@media (hover: none) and (pointer: coarse)': {
    transform: 'translateY(0%)',
  },
})

const S_ProductCard = styled('section', {
  overflow: 'hidden',
  position: 'relative',

  '& h1': {
    fluidFontSize: { min: fontSizes.md, max: fontSizes.lg },
  },

  '& span': {
    color: '$green300',
    fluidFontSize: { min: fontSizes.lg, max: fontSizes.xl },
    fontWeight: 'bold',
  },

  '*:is(:hover, :focus-visible) > &': {
    [`& ${S_CardTooltip}`]: {
      transform: 'translateY(0%)',
    },
  },
})

/* 
  Component
*/
interface ProductCardProps {
  imgUrl: string
  name: string
  price: string
}

export function ProductCard({ imgUrl, name, price }: ProductCardProps) {
  return (
    <S_ProductCard>
      <CardThumbnail src={imgUrl} />
      <S_CardTooltip>
        <h1>{name}</h1>
        <span>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number.parseFloat(price))}
        </span>
      </S_CardTooltip>
    </S_ProductCard>
  )
}
