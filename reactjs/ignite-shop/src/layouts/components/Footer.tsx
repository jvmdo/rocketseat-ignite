import { ContentContainer } from '@/components/ContentContainer'
import { styled } from '@/styles/stitches.config'

const S_Footer = styled('footer', {
  // In this case, the 'content' is blank
  [`& ${ContentContainer}`]: {
    height: '$vwHeaderFooterHeight',
    '@media (orientation: landscape)': {
      height: '$vhHeaderFooterHeight',
    },
  },
})

export function Footer() {
  return (
    <S_Footer>
      <ContentContainer></ContentContainer>
    </S_Footer>
  )
}
