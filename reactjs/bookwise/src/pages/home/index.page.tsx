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

export interface HomeProps extends TrendingBooksProps, RecentBookReviewsProps {}

export default function Home({ popularBooks, recentReviews }: HomeProps) {
  return (
    <S_Home>
      <header>
        <ChartLine />
        <h2>Início</h2>
      </header>
      <LastReadSection />
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
