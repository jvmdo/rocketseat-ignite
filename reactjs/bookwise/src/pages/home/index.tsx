import { ChartLine } from '@phosphor-icons/react'
import { S_Home } from './styles'
import { TrendingBooks } from './components/TrendingBooks'
import { RecentBookReviews } from './components/RecentBookReviews'
import { LastReadSection } from './components/LastReadSection'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

export interface HomeProps {}

export default function Home(props: HomeProps) {
  const userHasRead = true
  const { open, setOpen } = useContext(MainLayoutContext)

  return (
    <S_Home withReadSection={userHasRead}>
      <header>
        <ChartLine />
        <button onClick={() => setOpen(!open)}>
          <h2>Início</h2>
        </button>
      </header>
      {userHasRead && <LastReadSection />}
      <TrendingBooks />
      <RecentBookReviews />
    </S_Home>
  )
}
