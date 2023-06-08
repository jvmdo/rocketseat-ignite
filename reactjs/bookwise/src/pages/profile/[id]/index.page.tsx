import { UserStats } from './components/UserStats'
import { S_Profile } from './styles'
import { UserReviews } from './components/UserReviews'
import type { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { ProfileHeader } from './components/ProfileHeader'
import { useSession } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { EReviewGroup, EUser } from '@/@types/entities'

export interface ProfileProps {
  user: EUser
  groupedReviews: EReviewGroup[]
}

export default function Profile({ user, groupedReviews }: ProfileProps) {
  const { data: session } = useSession()

  const isUserOwnProfile = user.id === session?.user.id
  const fallback = {
    [`/users/${user.id}/reviews`]: groupedReviews,
  }

  return (
    <S_Profile>
      <ProfileHeader isUserOwnProfile={isUserOwnProfile} />
      <UserStats user={user} />
      <SWRConfig value={{ fallback }}>
        <UserReviews userId={user.id} userName={user.name} />
      </SWRConfig>
    </S_Profile>
  )
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
  params,
}) => {
  try {
    const id = params?.id as string

    // TODO: Avoid additional API Route call
    const user = (await api.get<EUser>(`/users/${id}`)).data
    const groupedReviews = (
      await api.get<EReviewGroup[]>(`/users/${id}/reviews`)
    ).data

    return {
      props: {
        profileId: id,
        user,
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
