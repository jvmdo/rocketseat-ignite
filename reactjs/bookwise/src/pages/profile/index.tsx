import { CaretLeft, User } from '@phosphor-icons/react'
import { UserStats } from './components/UserStats'
import { S_Profile } from './styles'
import { UserReviews } from './components/UserReviews'

export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const isUserOwnProfile = false

  return (
    <S_Profile>
      <header>
        {isUserOwnProfile ? (
          <>
            <User />
            <h2>Início</h2>
          </>
        ) : (
          <>
            <CaretLeft />
            <span>Voltar</span>
          </>
        )}
      </header>
      <UserStats />
      <UserReviews />
    </S_Profile>
  )
}
