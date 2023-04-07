import { ProductHero } from '@/components/ProductHero'
import { styled, config } from '@/styles/stitches.config'
import { ItemControl } from './ItemControl'
import { formatCurrency } from '@/hooks/useCart'

const { fontSizes: fs } = config.theme

/* 
  Styles
*/
const S_ProductInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  fluidGap: { min: 0.125, max: 0.5, viewportUnit: 'vw' },

  '& span': {
    color: '$gray300',
    fluidFontSize: { min: fs.rg, max: fs.md, viewportUnit: 'vw' },
  },

  '& > strong': {
    fluidFontSize: { min: fs.rg, max: fs.md, viewportUnit: 'vw' },
  },
})

const S_CartDrawerItem = styled('div', {
  display: 'flex',
  fluidGap: { min: 0.75, max: 1.25, viewportUnit: 'vw' },

  [`& ${ProductHero}`]: {
    flex: '5 0 1.5rem',
    maxHeight: '6rem',
    alignSelf: 'center',

    '& img': {
      height: '90%',
      width: 'auto',
    },
  },

  [`& ${S_ProductInfo}`]: {
    flex: '13 0 0',
  },
})

/* 
  Component
*/
interface CartDrawerItemProps {
  id: string
  imgUrl: string
  name: string
  price: number
  quantity: number
}

export function CartDrawerItem({
  id,
  imgUrl,
  name,
  price,
  quantity,
}: CartDrawerItemProps) {
  return (
    <S_CartDrawerItem>
      <ProductHero src={imgUrl} />
      <S_ProductInfo>
        <span>{name}</span>
        <strong>{formatCurrency(price)}</strong>
        <ItemControl id={id} quantity={quantity} />
      </S_ProductInfo>
    </S_CartDrawerItem>
  )
}
