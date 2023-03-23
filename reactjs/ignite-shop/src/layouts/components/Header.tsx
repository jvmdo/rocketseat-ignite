import { ContentContainer } from '@/components/ContentContainer'
import { styled } from '@/styles/stitches.config'
import Image from 'next/image'
import ShopLogo from 'public/logo.svg'

const S_Logo = styled(Image, {
  width: 'auto',
  height: '$vwHeaderFooterHeight',
  '@media (orientation: landscape)': {
    height: '$vhHeaderFooterHeight',
  },
})

export function Header() {
  return (
    <header>
      <ContentContainer>
        <S_Logo src={ShopLogo.src} width={130} height={52} alt="" />
      </ContentContainer>
    </header>
  )
}
