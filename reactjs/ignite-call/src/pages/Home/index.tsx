import { Heading, Text } from '@ignite-ui/react'
import { Hero, HeroContent, S_Home } from './styles'
import { ContentContainer } from '@/components/ContentContainer'
import hero from '../../assets/hero.png'
import { CtaUsername } from './components/CtaUsername'

export default function Home() {
  return (
    <S_Home>
      <ContentContainer>
        <Hero
          src={hero.src}
          width={827}
          height={442}
          quality={100}
          priority
          alt="An image of a calendar with dates and schedules displayed on the right side."
        />
        <HeroContent>
          <Heading as="h1">Agendamento descomplicado</Heading>
          <Text>
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <CtaUsername />
        </HeroContent>
      </ContentContainer>
    </S_Home>
  )
}
