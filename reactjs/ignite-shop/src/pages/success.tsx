import { ContentContainer } from '@/components/ContentContainer'
import { styled } from '@/styles/stitches.config'
import Image from 'next/image'
import Link from 'next/link'
import Shirt from 'public/beyond-the-limits.png'

interface SuccessProps {
  imgUrl: string
  name: string
  item: string
}

const S_Success = styled('main', {
  [`& ${ContentContainer}`]: {
    display: 'grid',
    placeContent: 'center',
    justifyItems: 'center',
    gap: '4rem',

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
      textAlign: 'center',
    },
  },
})

const S_ImageBox = styled('div', {
  borderRadius: '$rg',
  backgroundImage: '$imageGradient',

  display: 'grid',
  placeContent: 'center',

  height: '15rem',
  width: '13.125rem',
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
          <S_ImageBox>
            <Image src={imgUrl} width={190} height={190} alt="" />
          </S_ImageBox>
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
