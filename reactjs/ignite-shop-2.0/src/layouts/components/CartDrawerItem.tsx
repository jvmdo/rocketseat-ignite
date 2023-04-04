import { ProductHero } from '@/components/ProductHero'
import { styled, config } from '@/styles/stitches.config'

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

  '& button': {
    color: '$green500',
    fluidFontSize: { min: fs.xs, max: fs.rg, viewportUnit: 'vw' },
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: '0.25rem',

    '&:is(:hover, :focus-visible)': {
      color: '$green300',
    },
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
  imgUrl: string
  name: string
  price: string
}

export function CartDrawerItem({ imgUrl, name, price }: CartDrawerItemProps) {
  return (
    <S_CartDrawerItem>
      <ProductHero src={imgUrl} />
      <S_ProductInfo>
        <span>{name}</span>
        <strong>{price}</strong>
        <button>Remove</button>
      </S_ProductInfo>
    </S_CartDrawerItem>
  )
}
