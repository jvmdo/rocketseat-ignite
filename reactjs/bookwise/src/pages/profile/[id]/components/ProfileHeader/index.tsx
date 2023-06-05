import { CaretLeft, User } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { S_ProfileHeader } from './styles'

interface ProfileHeaderProps {
  isUserOwnProfile: boolean
}

export function ProfileHeader({ isUserOwnProfile }: ProfileHeaderProps) {
  const router = useRouter()

  function handleNavigateBack() {
    return router.back()
  }

  return (
    <S_ProfileHeader>
      {isUserOwnProfile ? (
        <h1>
          <User /> Início
        </h1>
      ) : (
        <button onClick={handleNavigateBack}>
          <CaretLeft /> Voltar
        </button>
      )}
    </S_ProfileHeader>
  )
}
