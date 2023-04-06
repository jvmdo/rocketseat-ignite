import { ContentContainer } from '@/components/ContentContainer'
import { ProductHero } from '@/components/ProductHero'
import { stripe } from '@/lib/stripe'
import { styled } from '@/styles/stitches.config'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup'
import Avatar, { avatarClasses } from '@mui/material/Avatar'

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

const S_AvatarGroup = styled(AvatarGroup, {
  $$avatarSize: '20vmin',

  [`&.${avatarGroupClasses.root} .${avatarClasses.root}`]: {
    border: 'none',
    marginLeft: 'calc($$avatarSize * -0.38)',
    height: '$$avatarSize',
    width: '$$avatarSize',
    boxShadow: '0 0 calc($$avatarSize * 0.4) rgba(0, 0, 0, 0.8)',
  },
})

/* 
  Component
*/
interface SuccessProps {
  imagesUrl: string[] | undefined
  customerName: string | undefined
  quantity: number | undefined
}

export default function Success({
  imagesUrl,
  customerName,
  quantity,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Ignite Shop: Successful Purchase</title>
      </Head>
      <S_Success>
        <ContentContainer>
          <article>
            <S_AvatarGroup max={5}>
              {imagesUrl?.map((imgUrl, index) => (
                <Avatar key={imgUrl} sx={{ zIndex: index }}>
                  <ProductHero
                    src={imgUrl}
                    imgMaxHeight={500}
                    imgMaxWidth={500}
                    avatar
                  />
                </Avatar>
              ))}
            </S_AvatarGroup>
            <h1>Successful Purchase!</h1>
            <p>
              Yay, <strong>{customerName}</strong>! Your purchase of{' '}
              <strong>{quantity}</strong> t-shirts is already on its way to your
              home.
            </p>
          </article>
          <S_Link href="/">Back to catalog</S_Link>
        </ContentContainer>
      </S_Success>
    </>
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

  const sessionItems = sessionData.line_items?.data.map(
    (lineItem) => lineItem.price?.product as Stripe.Product,
  )
  const imagesUrl = sessionItems?.map(({ images }) => images[0])
  const quantity = sessionData.line_items?.data.reduce(
    (acc, { quantity }) => acc + (quantity ?? 0),
    0,
  )
  const customerName = sessionData.customer_details?.name
  const customerNameFormatted = customerName
    ?.match(/(\w{2,})/g)
    ?.map((match) => match[0] + match.slice(1).toLowerCase())
    .join(' ')

  const props = {
    imagesUrl,
    quantity,
    customerName: customerNameFormatted,
  }

  return { props }
}
