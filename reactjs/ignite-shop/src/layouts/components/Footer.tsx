import { ContentContainer } from '@/components/ContentContainer'
import { styled } from '@/styles/stitches.config'

const S_Footer = styled('footer', {
  // In this case, the 'content' is blank
  [`& ${ContentContainer}`]: {
    height: '$heightHeaderFooter',
    '@media (orientation: landscape) and (max-height: 27em)': {
      height: 0,
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
