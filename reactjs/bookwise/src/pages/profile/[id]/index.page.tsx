import { UserStats } from './components/UserStats'
import { S_Profile } from './styles'
import { UserReviews } from './components/UserReviews'
import type { GetServerSideProps } from 'next'
import { ProfileHeader } from './components/ProfileHeader'
import { useSession } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { EReviewGroup, EUser } from '@/@types/entities'
import { fetchUser } from '@/services/fetch-user'
import { fetchUserReviews } from '@/services/fetch-user-reviews'
import { NextSeo } from 'next-seo'

export interface ProfileProps {
  user: EUser
  userReviews: EReviewGroup[]
}

export default function Profile({ user, userReviews }: ProfileProps) {
  const { data: session } = useSession()

  const isUserOwnProfile = user.id === session?.user.id
  const fallback = {
    [`/users/${user.id}/reviews`]: userReviews,
  }

  return (
    <>
      <NextSeo
        title="Perfil"
        description="Veja avaliações e estatísticas de um usuário"
      />

      <S_Profile>
        <ProfileHeader isUserOwnProfile={isUserOwnProfile} />
        <UserStats user={user} />
        <SWRConfig value={{ fallback }}>
          <UserReviews userId={user.id} userName={user.name} />
        </SWRConfig>
      </S_Profile>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
  params,
}) => {
  try {
    const profileId = params?.id as string

    const user = await fetchUser({ id: profileId })
    const userReviews = await fetchUserReviews({ id: profileId })

    return {
      props: {
        profileId,
        user,
        userReviews,
      },
    }
  } catch (error) {
    return {
      props: {},
      notFound: true,
    }
  }
}
