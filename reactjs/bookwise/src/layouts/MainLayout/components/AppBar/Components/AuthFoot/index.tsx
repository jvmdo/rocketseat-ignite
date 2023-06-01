import Image from 'next/image'
import { SignInFoot, SignOutFoot, UserFoot } from './styles'
import { SignIn, SignOut } from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

export function AuthFoot() {
  const { data: session } = useSession()
  const { setDialogOpen } = useContext(MainLayoutContext)

  function handleSignOutClick() {
    signOut({ callbackUrl: '/' })
  }

  function handleSignInClick() {
    setDialogOpen(true)
  }

  if (session) {
    return (
      <UserFoot className="auth-foot">
        {/* TODO: use Radix UI's <Avatar/> */}
        <Image
          src={session.user.image ?? 'https://picsum.photos/40'}
          width={32}
          height={32}
          alt=""
        />
        <span>{session.user.name?.split(' ')[0]}</span>
        <SignOutFoot type="button" onClick={handleSignOutClick}>
          <SignOut weight="bold" />
        </SignOutFoot>
      </UserFoot>
    )
  }

  return (
    <SignInFoot className="auth-foot" onClick={handleSignInClick}>
      <button type="button">
        <span>Fazer login</span>
        <SignIn weight="bold" />
      </button>
    </SignInFoot>
  )
}

AuthFoot.toString = () => '.auth-foot'
