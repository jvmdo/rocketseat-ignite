import { AppContainer } from '@/components/AppContainer'
import { Heading, Text } from '@ignite-ui/react'
import { Hero, HeroContent, S_Home } from './styles'
import { CtaUsername } from './components/CtaUsername'
import hero from '../../assets/hero.png'

export default function Home() {
  return (
    <AppContainer landing>
      <S_Home>
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
      </S_Home>
    </AppContainer>
  )
}
