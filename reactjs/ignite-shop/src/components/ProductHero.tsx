import { config, styled } from '@/styles/stitches.config'
import Image from 'next/image'

const S_ProductHero = styled('div', {
  aspectRatio: '87 / 82',
  background: '$imageGradient',
  borderRadius: '$rg',

  display: 'grid',
  placeItems: 'center',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    width: 'auto',
    height: `calc(
      $$mainHeight - 2 * (
        clamp(0.25rem, -0.583rem + 4.17vh, 2rem) - 
        $space$defaultLayoutGridGap
      )
    )`,
  },
})

const S_ProductImage = styled(Image, {
  width: '80%',
  height: 'auto',
})

interface ProductHeroProps {
  src: string
  alt?: string
  width?: string
  height?: string
  aspectRatio?: string
  imgMaxWidth?: number
  imgMaxHeight?: number
}

ProductHero.toString = () => '.product-hero'

export function ProductHero({
  src,
  alt = '',
  imgMaxWidth = 1203,
  imgMaxHeight = 1203,
  height,
  ...props
}: ProductHeroProps) {
  return (
    <S_ProductHero
      className="product-hero"
      css={{
        ...props,
        '@media (orientation: portrait)': { height },
      }}
    >
      <S_ProductImage
        src={src}
        width={imgMaxWidth}
        height={imgMaxHeight}
        alt={alt}
      />
    </S_ProductHero>
  )
}
