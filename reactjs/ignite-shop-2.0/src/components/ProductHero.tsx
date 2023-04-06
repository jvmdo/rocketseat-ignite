import { config, styled } from '@/styles/stitches.config'
import Image from 'next/image'

const S_ProductImage = styled(Image, {
  width: '80%',
  height: 'auto',
})

const S_ProductHero = styled('div', {
  aspectRatio: '87 / 82',
  background: '$imageGradient',
  borderRadius: '$rg',

  display: 'grid',
  placeItems: 'center',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    width: 'auto',
    height: '100cqh',
  },

  variants: {
    avatar: {
      true: {
        height: '$$avatarSize',
        width: '$$avatarSize',
      },
    },
  },
})

interface ProductHeroProps {
  src: string
  alt?: string
  width?: string
  height?: string
  aspectRatio?: string
  imgMaxWidth?: number
  imgMaxHeight?: number
  avatar?: boolean
}

ProductHero.toString = () => '.product-hero'

export function ProductHero({
  src,
  alt = '',
  imgMaxWidth = 1203,
  imgMaxHeight = 1203,
  height,
  avatar,
  ...props
}: ProductHeroProps) {
  return (
    <S_ProductHero
      className="product-hero"
      avatar={avatar}
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
