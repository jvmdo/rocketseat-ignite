import Image from 'next/image'
import { S_Hero } from './styles'
import { ComponentProps } from 'react'

export interface HeroProps extends ComponentProps<typeof S_Hero> {}

export function Hero(props: HeroProps) {
  return (
    <S_Hero {...props}>
      <Image
        className="image--mobile"
        src="/images/heros/mobile.png"
        width={820}
        height={410}
        quality={100}
        alt=""
      />
      <Image
        className="image--desktop"
        src="/images/heros/desktop.png"
        width={598}
        height={912}
        quality={100}
        alt=""
      />
    </S_Hero>
  )
}
