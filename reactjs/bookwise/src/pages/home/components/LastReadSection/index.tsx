import { ComponentProps } from 'react'
import { S_LastReadSection } from './styles'
import { PageLink } from '@/components/PageLink'
import { CaretRight } from '@phosphor-icons/react'
import { LastReadCard } from '@/components/LastReadCard'

interface LastReadSectionProps
  extends ComponentProps<typeof S_LastReadSection> {}

export function LastReadSection(props: LastReadSectionProps) {
  return (
    <S_LastReadSection className="last-read-section">
      <header>
        <h3>Livros populares</h3>
        <PageLink href="/profile/userId" color="purple">
          <span>Ver todas</span>
          <CaretRight />
        </PageLink>
      </header>
      <LastReadCard />
    </S_LastReadSection>
  )
}

LastReadSection.toString = () => '.last-read-section'
