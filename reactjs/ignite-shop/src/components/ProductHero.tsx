import { config, styled } from '@/styles/stitches.config'
import Image from 'next/image'

const S_ProductHero = styled('div', {
  aspectRatio: '87 / 82',
  background: '$imageGradient',
  borderRadius: '$rg',

  display: 'grid',
  placeItems: 'center',

  [`@media (orientation: landscape) or ${config.media.lg}`]: {
    width: 'max-content',
    // maxHeight: '100vh',
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
  aspectRatio?: string
  imgMaxWidth?: number
  imgMaxHeight?: number
}

export function ProductHero({
  src,
  alt = '',
  imgMaxWidth = 1203,
  imgMaxHeight = 1203,
  ...props
}: ProductHeroProps) {
  return (
    <S_ProductHero css={{ ...props }}>
      <S_ProductImage
        src={src}
        width={imgMaxWidth}
        height={imgMaxHeight}
        alt={alt}
      />
    </S_ProductHero>
  )
}
