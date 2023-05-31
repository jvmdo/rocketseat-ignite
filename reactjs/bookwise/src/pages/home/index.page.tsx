import { ChartLine } from '@phosphor-icons/react'
import { S_Home } from './styles'
import { TrendingBooks, TrendingBooksProps } from './components/TrendingBooks'
import {
  RecentBookReviews,
  RecentBookReviewsProps,
} from './components/RecentBookReviews'
import { LastReadSection } from './components/LastReadSection'
import { GetStaticProps } from 'next'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { LastReadCardProps } from '@/components/LastReadCard'
import useSWR from 'swr'

export interface HomeProps extends TrendingBooksProps, RecentBookReviewsProps {}

export default function Home({ popularBooks, recentReviews }: HomeProps) {
  // ? I would like to `useSWR` in [LastReadSection] component instead of here.
  // ? However, how to conditional render it in that case? I tried callback on data but it didn't work.
  const { data: session } = useSession()
  // TODO: optimistic? Update last-read on any book/review click
  const { data } = useSWR('last-read', async () => {
    const response = await api.get<LastReadCardProps>(
      `/users/${session?.user.id}/last-read`,
    )
    return response.data
  })

  return (
    <S_Home withReadSection={Boolean(data)}>
      <header>
        <ChartLine />
        <h2>Início</h2>
      </header>
      {data && <LastReadSection data={data} />}
      <TrendingBooks popularBooks={popularBooks} />
      <RecentBookReviews recentReviews={recentReviews} />
    </S_Home>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [popularBooksResponse, recentReviewsResponse] = await Promise.all([
      api.get('/books?popular=4'),
      api.get('/reviews'),
    ])

    return {
      props: {
        popularBooks: popularBooksResponse.data,
        recentReviews: recentReviewsResponse.data,
      },
      revalidate: 600, // 10 minutes
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 5, // 5 seconds
    }
  }
}
