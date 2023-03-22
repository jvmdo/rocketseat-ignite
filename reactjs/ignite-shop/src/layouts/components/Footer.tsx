import { ContentContainer } from '@/components/ContentContainer'
import { styled } from '@/styles/stitches.config'

const S_Footer = styled('footer', {
  $$contentHeight: 'clamp(2rem, 1.405rem + 2.98vw, 3.25rem)',
  // Change viewport basis from width to height
  '@media (orientation: landscape)': {
    $$contentHeight: 'clamp(2rem, 1.405rem + 2.98vh, 3.25rem)',
  },

  // In this case, the 'content' in blank
  [`& ${ContentContainer}`]: {
    height: '$$contentHeight',
  },

  paddingBottom: 'clamp(0.75rem, 4.444vh, 5rem)',
})

export function Footer() {
  return (
    <S_Footer>
      <ContentContainer></ContentContainer>
    </S_Footer>
  )
}
