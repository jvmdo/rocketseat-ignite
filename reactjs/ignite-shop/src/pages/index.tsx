import { ContentContainer } from '@/components/ContentContainer'
import { ProductCard } from '@/components/ProductCard'
import { styled, config } from '@/styles/stitches.config'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { GetServerSideProps } from 'next'

/* 
  Styles
*/
const GradientSpace = styled('div', {
  appearance: 'none',
  position: 'absolute',
  insetInline: 0,
  width: '100%',
  zIndex: '10',

  '& svg': {
    color: '$gray300',
  },

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    insetInline: 'unset',
    width: '$$fluidPadding',
    // ? [insetBlock] set here is overridden even when media matches 😠
    // ? That's why I had to set it in each child
  },
})

const GradientSpaceLeft = styled(GradientSpace, {
  gradientDarkSide: { deg: 0, endColor: '#121214' },
  insetBlock: '0 calc(100% - 2 * $$fluidPadding)',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    gradientDarkSide: { deg: -90, endColor: '#121214bf' },
    insetBlock: 0,
    insetInlineStart: 0,
  },
})

const GradientSpaceRight = styled(GradientSpace, {
  gradientDarkSide: { deg: 180, endColor: '#121214' },
  insetBlock: 'calc(100% - 2 * $$fluidPadding) 0',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    gradientDarkSide: { deg: 90, endColor: '#121214bf' },
    insetBlock: 0,
    insetInlineEnd: 0,
  },
})

const S_Home = styled('main', {
  container: 'main / size',
  overflow: 'hidden',
  position: 'relative',

  [`& ${ContentContainer}`]: {
    height: '100cqh',
    paddingBlock: 'calc(2 * $$fluidPadding)',

    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 0.286rem + 3.57vmin, 2rem)',

    overflow: 'auto',
    scrollSnapType: 'both mandatory',

    [`& > *:not(${GradientSpace})`]: {
      scrollSnapAlign: 'center',
    },

    scrollbarWidth: 'none' /* Hide the scrollbar in Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none' /* Hide the scrollbar in Chrome, Edge and Safari */,
    },

    [`@media (orientation: landscape) or ${config.media.lg}`]: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBlock: 'unset',
      [`& > *:not(${GradientSpace})`]: {
        flex: '1 0 auto',
      },
    },
  },
})

/* 
  Component
*/
interface HomeProps {
  products: {
    id: string
    imgUrl: string
    name: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  return (
    <S_Home>
      <ContentContainer>
        <GradientSpaceLeft />
        {products.map(({ id, ...props }) => (
          <Link key={id} href={`products/${id}`}>
            <ProductCard {...props} />
          </Link>
        ))}
        <GradientSpaceRight />
      </ContentContainer>
    </S_Home>
  )
}

export const getServerSideProps: GetServerSideProps<
  Pick<HomeProps, 'products'>
> = async () => {
  const { data } = await stripe.products.list({
    expand: ['data.default_price', 'data.default_price.currency_options'],
  })

  const products = data.map((product) => {
    const unitAmount = (product.default_price as Stripe.Price)?.currency_options
      ?.usd.unit_amount
    const priceFormatted = unitAmount
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(unitAmount / 100)
      : ''

    return {
      id: product.id,
      imgUrl: product.images[0],
      name: product.name,
      price: priceFormatted,
    }
  })

  return {
    props: { products },
  }
}
