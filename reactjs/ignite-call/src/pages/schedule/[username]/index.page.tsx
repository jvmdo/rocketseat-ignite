import { AppContainer } from '@/components/AppContainer'
import { ProfileHeader } from '../components/ProfileHeader'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { SchedulingCalendar } from '../components/SchedulingCalendar'
import { SchedulingForm } from '../components/SchedulingForm'

interface ScheduleProps {
  name: string
  bio: string | null
  avatarUrl: string | null
}

export default function Schedule(props: ScheduleProps) {
  return (
    <AppContainer larger>
      <ProfileHeader {...props} />
      <SchedulingCalendar />
      <SchedulingForm />
    </AppContainer>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  // The pages will be generated on the first time they are requested
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username as string
  const userProfileData = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!userProfileData) {
    return {
      notFound: true,
    }
  }

  const scheduleData: ScheduleProps = {
    name: userProfileData.name,
    bio: userProfileData.bio,
    avatarUrl: userProfileData.avatar_url,
  }

  return {
    props: scheduleData,
    revalidate: 60 * 60 * 24, // 7 days
  }
}
