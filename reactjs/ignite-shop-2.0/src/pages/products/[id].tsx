import { BrandButton } from '@/components/BrandButton'
import { ContentContainer } from '@/components/ContentContainer'
import { ProductHero } from '@/components/ProductHero'
import { stripe } from '@/lib/stripe'
import { styled, config } from '@/styles/stitches.config'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { CSSProperties } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'

const { fontSizes: fs, colors } = config.theme
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
    fluidGap: { min: 1.5, max: 4.5, viewportUnit: 'vw' },

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
    fluidFontSize: { min: fs.xl, max: fs.xxl, viewportUnit: 'vw' },
  },

  '& span': {
    color: '$green300',
    fluidFontSize: { min: fs.xl, max: fs.xxl, viewportUnit: 'vw' },
  },

  '& p': {
    fluidFontSize: { min: fs.rg, max: fs.md, viewportUnit: 'vw' },
    fluidSpace: {
      prop: 'marginTop',
      min: 0,
      max: '2rem',
      beginAt: config.media.xxs,
      endAt: config.media.lg,
      viewportUnit: 'vw',
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
  id: string
  imgUrl: string
  name: string
  description: string | null
  price: number
  priceId: string
}

export default function Product({
  id,
  imgUrl,
  name,
  description,
  price,
  priceId,
}: ProductProps) {
  const {
    cartDetails,
    addItem,
    removeItem,
    currency: _currency,
  } = useShoppingCart()

  const isInCart = Object.keys(cartDetails ?? {}).some((key) => key === id)
  const currency = _currency ?? 'USD'
  const btnColor = isInCart
    ? { '--bg': colors.gray400, '--h-bg': colors.gray300 }
    : {}
  // const [isProcessingCheckout, setProcessingCheckout] = useState(false)

  /* async function handleCheckoutClick() {
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
  } */

  function handleToggleItem() {
    if (isInCart) {
      removeItem(id)
    } else {
      addItem({ id, name, price, currency, image: imgUrl })
    }
  }

  return (
    <>
      <Head>
        <title>Ignite Shop: Products</title>
      </Head>
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
                currency,
              }).format(price / 100)}
            </span>
            <p>{description}</p>
            <BrandButton
              onClick={handleToggleItem}
              style={btnColor as CSSProperties}
            >
              {isInCart ? 'Remove' : 'Add to bag'}
            </BrandButton>
          </S_ProductInfo>
        </ContentContainer>
      </S_Product>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await stripe.products.list()
  const paths = data.map(({ id }) => ({ params: { id } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async ({
  params,
}) => {
  const productId = params?.id as string
  const data = await stripe.products.retrieve(productId, {
    expand: ['default_price', 'default_price.currency_options'],
  })

  const unitAmount = (data.default_price as Stripe.Price).currency_options?.usd
    .unit_amount
  /* const priceFormatted = unitAmount
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(unitAmount / 100)
    : null */

  const product = {
    id: data.id,
    imgUrl: data.images[0],
    name: data.name,
    description: data.description,
    price: unitAmount ?? 0,
    priceId: (data.default_price as Stripe.Price).id,
  }

  return {
    props: product,
  }
}
