import { ChartLine } from '@phosphor-icons/react'
import { S_Home } from './styles'
import { TrendingBooks } from './components/TrendingBooks'
import { RecentBookReviews } from './components/RecentBookReviews'
import { LastReadSection } from './components/LastReadSection'
import { GetStaticProps } from 'next'
import { api } from '@/lib/axios'
import { SWRConfig } from 'swr'
import { EBook, EReview } from '@/@types/entities'

export interface HomeProps {
  popularBooks: EBook[]
  recentReviews: EReview[]
}

export default function Home({ popularBooks, recentReviews }: HomeProps) {
  const fallback = { '/reviews': recentReviews }

  return (
    <S_Home>
      <header>
        <ChartLine />
        <h2>Início</h2>
      </header>
      <LastReadSection />
      <TrendingBooks popularBooks={popularBooks} />
      <SWRConfig value={{ fallback }}>
        <RecentBookReviews />
      </SWRConfig>
    </S_Home>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // TODO: do not call API Routes
    const popularBooks = (await api.get<EBook[]>('/books?popular=4')).data
    const recentReviews = (await api.get<EReview[]>('/reviews')).data

    return {
      props: { popularBooks, recentReviews },
      revalidate: 600, // 10 minutes
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 5, // 5 seconds
    }
  }
}
