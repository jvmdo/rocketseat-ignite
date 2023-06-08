import { S_LastReadSection } from './styles'
import { PageLink } from '@/components/PageLink'
import { CaretRight } from '@phosphor-icons/react'
import { LastReadCard } from '@/components/LastReadCard'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { api } from '@/lib/axios'
import { ELastRead } from '@/@types/entities'

export function LastReadSection() {
  const { data: session } = useSession()
  const userId = session?.user.id

  const { data: lastRead } = useSWR(() => shouldFetch(userId), fetcher)

  if (!lastRead) {
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
      <LastReadCard lastRead={lastRead} />
    </S_LastReadSection>
  )
}

LastReadSection.toString = () => '.last-read-section'

function shouldFetch(userId: string | undefined) {
  if (!userId) {
    console.warn('[LastReadSection] fetch failed, [userId] is undefined')
    return null
  }

  return `/users/${userId}/last-read`
}

async function fetcher(url: string) {
  return (await api.get<ELastRead>(url)).data
}
