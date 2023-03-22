import { ContentContainer } from '@/components/ContentContainer'
import { styled } from '@/styles/stitches.config'
import Image from 'next/image'
import ShopLogo from 'public/logo.svg'

const S_Header = styled('header', {
  $$contentHeight: 'clamp(2rem, 1.405rem + 2.98vw, 3.25rem)',
  // Change viewport basis from width to height
  '@media (orientation: landscape)': {
    $$contentHeight: 'clamp(2rem, 1.405rem + 2.98vh, 3.25rem)',
  },

  paddingTop: 'clamp(0.75rem, 4.444vh, 5rem)',
})

const S_Logo = styled(Image, {
  height: '$$contentHeight',
  width: 'auto',
})

export function Header() {
  return (
    <S_Header>
      <ContentContainer>
        <S_Logo src={ShopLogo.src} width={130} height={52} alt="" />
      </ContentContainer>
    </S_Header>
  )
}
