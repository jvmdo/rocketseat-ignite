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

  minHeight: 'clamp(4rem, 2.571rem + 7.14vw, 6rem)',
  margin: '0.25rem',
  padding: '1rem clamp(1rem, 0.524rem + 2.38vw, 2rem)',

  position: 'absolute',
  bottom: 0,
  insetInline: 0,
  transform: 'translateY(150%)',
  transition: 'transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)',

  /* No translate behavior for touchscreens devices */
  '@media (hover: none) or (pointer: coarse)': {
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
        <span>{price}</span>
      </S_CardTooltip>
    </S_ProductCard>
  )
}
