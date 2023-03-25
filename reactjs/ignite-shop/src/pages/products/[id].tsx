import { BrandButton } from '@/components/BrandButton'
import { ContentContainer } from '@/components/ContentContainer'
import { ProductHero } from '@/components/ProductHero'
import { styled, config } from '@/styles/stitches.config'
import Shirt from 'public/beyond-the-limits.png'

const { fontSizes } = config.theme
const { media } = config

/* 
  Styles
*/
const S_Product = styled('main', {
  container: 'main / size',
  display: 'grid',
  overflow: 'auto',

  [`& ${ContentContainer}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridAutoRows: 'min-content auto',
    fluidGap: { min: 1.5, max: 4.5 },

    '@media (orientation: landscape)': {
      placeContent: 'center',
    },

    [`@media (orientation: landscape) or ${media.lg}`]: {
      gridTemplateColumns: '72fr 65fr',
    },

    [`& > ${ProductHero}`]: {
      justifySelf: 'center',
    },
  },
})

const S_ProductInfo = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '& h1': {
    lineHeight: '1.4',
    fluidFontSize: { min: fontSizes.xl, max: fontSizes.xxl },
  },

  '& span': {
    color: '$green300',
    fluidFontSize: { min: fontSizes.xl, max: fontSizes.xxl },
  },

  '& p': {
    fluidFontSize: { min: fontSizes.rg, max: fontSizes.md },
    fluidSpace: {
      prop: 'marginTop',
      min: 0,
      max: '2rem',
      beginAt: config.media.xxs,
      endAt: config.media.lg,
    },
  },

  [`& ${BrandButton}`]: {
    marginTop: 'auto',
  },
})

/* 
  Component
*/
interface ProductProps {
  imgUrl: string
  name: string
  price: string
  description: string
}

export default function Product({
  imgUrl = Shirt.src,
  name = 'Beyond the Limits',
  price = '79.90',
  description = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem, harum labore architecto, placeat maxime culpa neque, corrupti voluptate atque unde eveniet itaque! Accusantium ipsam, dolorem nam perspiciatis voluptatibus animi?',
}: ProductProps) {
  return (
    <S_Product>
      <ContentContainer>
        <ProductHero
          src={imgUrl}
          aspectRatio="36/41"
          height="min(40vh, 50cqmax)"
        />
        <S_ProductInfo>
          <h1>{name}</h1>
          <span>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(Number.parseFloat(price))}
          </span>
          <p>{description}</p>
          <BrandButton>Buy now</BrandButton>
        </S_ProductInfo>
      </ContentContainer>
    </S_Product>
  )
}
