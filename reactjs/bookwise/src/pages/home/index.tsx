import { ChartLine } from '@phosphor-icons/react'
import { S_Home } from './styles'
import { TrendingBooks } from './components/TrendingBooks'
import { RecentBookReviews } from './components/RecentBookReviews'
import { LastReadSection } from './components/LastReadSection'

export interface HomeProps {}

export default function Home(props: HomeProps) {
  const userHasRead = true

  return (
    <S_Home withReadSection={userHasRead}>
      <header>
        <ChartLine />
        <h2>Início</h2>
      </header>
      {userHasRead && <LastReadSection />}
      <TrendingBooks />
      <RecentBookReviews />
    </S_Home>
  )
}
