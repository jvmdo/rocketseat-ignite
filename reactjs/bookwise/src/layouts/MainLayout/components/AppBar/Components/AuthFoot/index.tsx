import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { SignInFoot, SignOutFoot, UserFoot } from './styles'
import { SignIn, SignOut } from '@phosphor-icons/react'

AuthFoot.toString = () => '.auth-foot'

export function AuthFoot() {
  const session = useSession()

  if (session) {
    return (
      <UserFoot className="auth-foot">
        <Image src="" width={32} height={32} alt="" />
        <span>Cristofer</span>
        <SignOutFoot type="button">
          <SignOut weight="bold" />
        </SignOutFoot>
      </UserFoot>
    )
  }

  return (
    <SignInFoot as="button" type="button" className="auth-foot">
      <span>Fazer login</span>
      <SignIn weight="bold" />
    </SignInFoot>
  )
}
