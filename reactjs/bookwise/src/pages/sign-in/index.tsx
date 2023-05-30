import { ComponentProps, ReactElement } from 'react'
import { Hero } from './components/Hero'
import { ButtonGroup, HeadingGroup, S_SignIn, SignInOptions } from './styles'
import { AuthButton } from '@/components/AuthButton'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export interface SignInProps extends ComponentProps<typeof S_SignIn> {}

SignIn.getLayout = function getLayout(page: ReactElement) {
  // This page has no layout
  return <>{page}</>
}

export default function SignIn() {
  const router = useRouter()

  function handleSignInClick(provider?: string) {
    if (provider) {
      return signIn(provider, { callbackUrl: '/home' })
    } else {
      return router.push('/home')
    }
  }

  return (
    <S_SignIn>
      <Hero />
      <SignInOptions>
        <HeadingGroup>
          <h1>Boas vindas!</h1>
          <p>Faça seu login ou acesse como visitante.</p>
        </HeadingGroup>
        <ButtonGroup>
          <AuthButton
            icon={{ name: 'google' }}
            text="Entra com Google"
            onClick={() => handleSignInClick('google')}
          />
          <AuthButton
            icon={{ name: 'github' }}
            text="Entra com Github"
            onClick={() => handleSignInClick('github')}
          />
          <AuthButton
            icon={{ name: 'rocket' }}
            text="Acessar como visitante"
            onClick={() => handleSignInClick()}
          />
        </ButtonGroup>
      </SignInOptions>
    </S_SignIn>
  )
}
