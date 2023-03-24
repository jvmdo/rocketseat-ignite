import { ContentContainer } from '@/components/ContentContainer'
import { ProductCard } from '@/components/ProductCard'
import { styled, config } from '@/styles/stitches.config'
import Link from 'next/link'
// import { CaretLeft, CaretRight } from 'phosphor-react'
import CaretLeft from 'public/arrow-left.svg'
import CaretRight from 'public/arrow-right.svg'
import { useMediaQuery } from 'react-responsive'
import Shirt1 from 'public/beyond-the-limits.png'
import Shirt2 from 'public/Variant5.png'
import Shirt3 from 'public/Variant8.png'
import Shirt4 from 'public/Variant7.png'
import Shirt5 from 'public/Variant9.png'

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
    // [insetBlock] set here is overridden even when media matches 😠
    // That's why I had to set it in each child
  },
})

const GradientSpaceLeft = styled(GradientSpace, {
  background: 'linear-gradient(0deg, #12121400 0%, #121214 100%)',
  insetBlock: '0 calc(100% - 2 * $$fluidPadding)',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    background: 'linear-gradient(-90deg, #12121400 0%, #121214bf 100%)',
    insetBlock: 0,
    insetInlineStart: 0,
  },
})

const GradientSpaceRight = styled(GradientSpace, {
  background: 'linear-gradient(180deg, #12121400 0%, #121214 100%)',
  insetBlock: 'calc(100% - 2 * $$fluidPadding) 0',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    background: 'linear-gradient(90deg, #12121400 0%, #121214bf 100%)',
    insetBlock: 0,
    insetInlineEnd: 0,
  },
})

const S_Home = styled('main', {
  overflow: 'hidden',
  position: 'relative',

  // TODO: try container units
  [`& ${ContentContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 0.286rem + 3.57vw, 2rem)',

    overflow: 'auto',
    scrollSnapType: 'both mandatory',

    [`& > *:not(${GradientSpace})`]: {
      scrollSnapAlign: 'center',
    },

    scrollbarWidth: 'none' /* Hide the scrollbar in Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none' /* Hide the scrollbar in Chrome, Edge and Safari */,
    },

    paddingBlock: 'calc(2 * $$fluidPadding)',

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
export default function Home() {
  const displayArrow = useMediaQuery({
    query: `${config.media.lg}`,
  })
  // const isTablet = useMediaQuery({
  //   query: `(orientation: portrait) and ${config.media.md}`,
  // })
  // const isMobile = useMediaQuery({
  //   query: `(orientation: landscape) and ${config.media.maxLg}`,
  // })

  return (
    <S_Home>
      <ContentContainer>
        <GradientSpaceLeft
          as={displayArrow ? 'button' : undefined}
          onClick={displayArrow ? () => console.count('clicked') : undefined}
        >
          {/* {displayArrow && <CaretLeft size={isMobile || isTablet ? 32 : 48} />} */}
          {displayArrow && <img src={CaretLeft.src} />}
        </GradientSpaceLeft>

        <Link href="products/1">
          <ProductCard
            imgUrl={Shirt1.src}
            name="Beyond the Limits"
            price="79.90"
          />
        </Link>
        <Link href="products/1">
          <ProductCard
            imgUrl={Shirt2.src}
            name="Beyond the Summit"
            price="69.90"
          />
        </Link>
        <Link href="products/1">
          <ProductCard
            imgUrl={Shirt3.src}
            name="Além do Cumesss"
            price="89.90"
          />
        </Link>
        <Link href="products/1">
          <ProductCard
            imgUrl={Shirt4.src}
            name="Além dos Limites"
            price="49.90"
          />
        </Link>
        <Link href="products/1">
          <ProductCard
            imgUrl={Shirt5.src}
            name="Além dos Limites"
            price="49.90"
          />
        </Link>

        <GradientSpaceRight
          as={displayArrow ? 'button' : undefined}
          onClick={displayArrow ? () => console.count('clicked') : undefined}
        >
          {/* {displayArrow && <CaretRight size={isMobile || isTablet ? 32 : 48} />} */}
          {displayArrow && <img src={CaretRight.src} />}
        </GradientSpaceRight>
      </ContentContainer>
    </S_Home>
  )
}
