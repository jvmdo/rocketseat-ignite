import { S_LastReadSection } from './styles'
import { PageLink } from '@/components/PageLink'
import { CaretRight } from '@phosphor-icons/react'
import { LastReadCard, LastReadCardProps } from '@/components/LastReadCard'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { api } from '@/lib/axios'

export function LastReadSection() {
  const { data: session } = useSession()
  const userId = session?.user.id ?? 'error'

  const { data: book } = useSWR(`/users/${userId}/last-read`, fetcher)

  if (!book) {
    return null
  }

  return (
    <S_LastReadSection className="last-read-section">
      <header>
        <h3>Sua última leitura</h3>
        <PageLink href={`/profile/${userId}`} color="purple">
          <span>Ver todas</span>
          <CaretRight />
        </PageLink>
      </header>
      <LastReadCard {...book} />
    </S_LastReadSection>
  )
}

LastReadSection.toString = () => '.last-read-section'

async function fetcher(url: string) {
  return (await api.get<LastReadCardProps>(url)).data
}
