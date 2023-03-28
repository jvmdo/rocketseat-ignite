import { BrandButton } from '@/components/BrandButton'
import { ContentContainer } from '@/components/ContentContainer'
import { ProductHero } from '@/components/ProductHero'
import { stripe } from '@/lib/stripe'
import { styled, config } from '@/styles/stitches.config'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Stripe from 'stripe'

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
  description: string | null
  price: string | null
  priceId: string
}

export default function Product({
  imgUrl,
  name,
  description,
  price,
  priceId,
}: ProductProps) {
  const [isProcessingCheckout, setProcessingCheckout] = useState(false)

  async function handleCheckoutClick() {
    try {
      setProcessingCheckout(true)
      const response = await axios.post('/api/checkout', {
        priceId,
      })
      const checkoutUrl = response.data.url
      window.location.href = checkoutUrl
    } catch (err) {
      setProcessingCheckout(false)
      console.log('[Product/handleCheckoutClick]: ', err)
    }
  }

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
          <span>{price}</span>
          <p>{description}</p>
          <BrandButton
            onClick={handleCheckoutClick}
            disabled={isProcessingCheckout}
          >
            Buy now
          </BrandButton>
        </S_ProductInfo>
      </ContentContainer>
    </S_Product>
  )
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async ({
  params,
}) => {
  const productId = params?.id as string
  const data = await stripe.products.retrieve(productId, {
    expand: ['default_price', 'default_price.currency_options'],
  })

  const unitAmount = (data.default_price as Stripe.Price).currency_options?.usd
    .unit_amount
  const priceFormatted = unitAmount
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(unitAmount / 100)
    : null

  const product = {
    imgUrl: data.images[0],
    name: data.name,
    description: data.description,
    price: priceFormatted,
    priceId: (data.default_price as Stripe.Price).id,
  }

  return {
    props: product,
  }
}
