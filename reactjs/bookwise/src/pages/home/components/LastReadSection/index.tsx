import { S_LastReadSection } from './styles'
import { PageLink } from '@/components/PageLink'
import { CaretRight } from '@phosphor-icons/react'
import { LastReadCard, LastReadCardProps } from '@/components/LastReadCard'

interface LastReadSectionProps {
  data: LastReadCardProps
}

export function LastReadSection({ data }: LastReadSectionProps) {
  return (
    <S_LastReadSection className="last-read-section">
      <header>
        <h3>Sua última leitura</h3>
        <PageLink href="/profile/userId" color="purple">
          <span>Ver todas</span>
          <CaretRight />
        </PageLink>
      </header>
      <LastReadCard {...data} />
    </S_LastReadSection>
  )
}

LastReadSection.toString = () => '.last-read-section'
