import Image from 'next/image'
import { S_Hero } from './styles'
import { ComponentProps } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { config } from '@/styles/stitches.config'

const { media } = config

export interface HeroProps extends ComponentProps<typeof S_Hero> {}

export function Hero(props: HeroProps) {
  const isPortrait = useMediaQuery(media.p)

  return (
    <S_Hero {...props}>
      {isPortrait ? (
        <Image
          className="image--mobile"
          src="/images/heros/mobile.png"
          width={820}
          height={410}
          quality={100}
          alt="BookWise"
        />
      ) : (
        <Image
          className="image--desktop"
          src="/images/heros/desktop.png"
          width={598}
          height={912}
          quality={100}
          alt="BookWise"
        />
      )}
    </S_Hero>
  )
}
