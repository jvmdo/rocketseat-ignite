import { config, styled } from '@/styles/stitches.config'
import { ProductHero as CardThumbnail } from './ProductHero'
import { Handbag, Trash } from 'phosphor-react'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'
import { CSSProperties } from 'react'
import { BrandButton } from './BrandButton'

const { fontSizes, colors } = config.theme

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

  '& h1': {
    fluidFontSize: { min: fontSizes.md, max: fontSizes.lg, viewportUnit: 'vw' },
  },

  '& span': {
    color: '$green300',
    fluidFontSize: { min: fontSizes.lg, max: fontSizes.xl, viewportUnit: 'vw' },
    fontWeight: 'bold',
  },
})

const S_ProductCard = styled('section', {
  overflow: 'hidden',
  position: 'relative',

  '&:is(:hover, :focus-visible)': {
    [`& ${S_CardTooltip}`]: {
      transform: 'translateY(0%)',
    },
  },
})

/* 
  Component
*/
interface ProductCardProps {
  id: string
  imgUrl: string
  name: string
  price: number
  priceId: string
}

ProductCard.toString = () => '.product-card'

export function ProductCard({
  id,
  imgUrl,
  name,
  price,
  priceId,
}: ProductCardProps) {
  const {
    addItem,
    removeItem,
    currency: _currency,
    cartDetails,
  } = useShoppingCart()

  const currency = _currency ?? 'USD'
  const isInCart = Object.keys(cartDetails ?? {}).some((key) => key === id)
  // TODO: move to component
  const btnColor = isInCart
    ? { '--bg': colors.gray400, '--h-bg': colors.gray300 }
    : {}

  function handleToggleItem() {
    if (isInCart) {
      removeItem(id)
    } else {
      // eslint-disable-next-line camelcase
      addItem({ id, name, price, currency, image: imgUrl, price_id: priceId })
    }
  }

  return (
    <S_ProductCard className="product-card">
      <Link href={`products/${id}`}>
        <CardThumbnail src={imgUrl} />
      </Link>
      <S_CardTooltip>
        <div>
          <h1>{name}</h1>
          <span>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
            }).format(price / 100)}
          </span>
        </div>
        <BrandButton
          onClick={handleToggleItem}
          style={btnColor as CSSProperties}
        >
          {isInCart ? (
            <Trash size={32} weight="bold" />
          ) : (
            <Handbag size={32} weight="bold" />
          )}
        </BrandButton>
      </S_CardTooltip>
    </S_ProductCard>
  )
}
