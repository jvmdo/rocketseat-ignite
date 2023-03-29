import { ContentContainer } from '@/components/ContentContainer'
import { ProductHero } from '@/components/ProductHero'
import { stripe } from '@/lib/stripe'
import { styled } from '@/styles/stitches.config'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'

/* 
  Styles
*/
const S_Success = styled('main', {
  overflow: 'auto',
  display: 'grid',
  placeItems: 'center',

  [`& ${ContentContainer}`]: {
    display: 'grid',
    placeContent: 'center',
    justifyItems: 'center',
    gap: '4rem',

    textAlign: 'center',

    '& h1': {
      lineHeight: 1.4,
      fontSize: '$xxl',
    },

    '& article': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',

      fontSize: '$lg',
      maxWidth: '50ch',
    },

    [`& ${ProductHero}`]: {
      height: '36vh',
    },
  },
})

const S_Link = styled(Link, {
  color: '$green500',
  fontSize: '$lg',
  fontWeight: 'bold',
  marginTop: '1.5rem',

  '&:is(:hover, :focus-visible)': {
    color: '$green300',
  },
})

/* 
  Component
*/
interface SuccessProps {
  imgUrl: string
  itemName: string
  customerName: string | undefined
}

export default function Success({
  imgUrl,
  customerName,
  itemName,
}: SuccessProps) {
  return (
    <S_Success>
      <ContentContainer>
        <h1>Successful Purchase!</h1>
        <article>
          <ProductHero
            src={imgUrl}
            imgMaxHeight={500}
            imgMaxWidth={500}
            aspectRatio="36/41"
          />
          <p>
            Yay, <strong>{customerName}</strong>! Your{' '}
            <strong>{itemName}</strong> t-shirt is already on its way to your
            home.
          </p>
        </article>
        <S_Link href="/">Back to catalog</S_Link>
      </ContentContainer>
    </S_Success>
  )
}

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({
  query,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = query.session_id as string
  const sessionData = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const sessionItem = sessionData.line_items?.data[0].price
    ?.product as Stripe.Product
  const customerName = sessionData.customer_details?.name
  const customerNameFormatted = customerName
    ?.match(/(\w{2,})/g)
    ?.map((match) => match[0] + match.slice(1).toLowerCase())
    .join(' ')

  const props = {
    imgUrl: sessionItem.images[0],
    itemName: sessionItem.name,
    customerName: customerNameFormatted,
  }

  return { props }
}
