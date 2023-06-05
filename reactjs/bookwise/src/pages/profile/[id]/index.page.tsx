import { UserStats, UserWithStatsData } from './components/UserStats'
import { S_Profile } from './styles'
import { UserReviews } from './components/UserReviews'
import type { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { ProfileHeader } from './components/ProfileHeader'
import { useSession } from 'next-auth/react'
import { ReviewData } from './components/UserReviews/components/UserReviewCard'
import { SWRConfig } from 'swr'

export type ReviewGroupData = {
  name: string | undefined
  reviews: ReviewData[] | undefined
}

export interface ProfileProps {
  profileId: string
  userWithStats: UserWithStatsData
  groupedReviews: ReviewGroupData[]
}

export default function Profile({
  profileId,
  userWithStats: { user, ...stats },
  groupedReviews,
}: ProfileProps) {
  const { data: session } = useSession()

  const isUserOwnProfile = profileId === session?.user.id
  const fallback = {
    [`/users/${profileId}/reviews`]: groupedReviews,
  }

  return (
    <S_Profile>
      <ProfileHeader isUserOwnProfile={isUserOwnProfile} />
      <UserStats user={user} stats={stats} />
      <SWRConfig value={{ fallback }}>
        <UserReviews userId={profileId} userName={user.name ?? ''} />
      </SWRConfig>
    </S_Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string

    // TODO: Avoid additional API Route call
    const userWithStats = (await api.get(`/users/${id}`)).data
    const groupedReviews = (await api.get(`/users/${id}/reviews`)).data

    return {
      props: {
        profileId: id,
        userWithStats,
        groupedReviews,
      },
    }
  } catch (error) {
    return {
      props: {},
      notFound: true,
    }
  }
}
