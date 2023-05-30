import { CaretLeft, User } from '@phosphor-icons/react'
import { UserStats } from './components/UserStats'
import { S_Profile } from './styles'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { UserReviews } from './components/UserReviews'

export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const isUserOwnProfile = false
  const { open, setOpen } = useContext(MainLayoutContext)

  return (
    <S_Profile>
      <header>
        {isUserOwnProfile ? (
          <>
            <User />
            <h2>Início</h2>
          </>
        ) : (
          <button onClick={() => setOpen(!open)}>
            <CaretLeft />
            <span>Voltar</span>
          </button>
        )}
      </header>
      <UserStats />
      <UserReviews />
    </S_Profile>
  )
}
