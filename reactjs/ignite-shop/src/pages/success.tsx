import { ContentContainer } from '@/components/ContentContainer'
import { ProductHero } from '@/components/ProductHero'
import { styled } from '@/styles/stitches.config'
import Link from 'next/link'
import Shirt from 'public/beyond-the-limits.png'

/* 
  Styles
*/
const S_Success = styled('main', {
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

    // TODO: Fix scroll issue in landscape
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
  name: string
  item: string
}

export default function Success({
  imgUrl = Shirt.src,
  name = 'Diego Fernandes',
  item = 'Beyond the Limits T-Shirt',
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
            width="60%"
            aspectRatio="36/41"
          />
          <p>
            Yay, <strong>{name}</strong>! Your <strong>{item}</strong> is
            already on its way to your home.
          </p>
        </article>
        <S_Link href="/">Back to catalog</S_Link>
      </ContentContainer>
    </S_Success>
  )
}
