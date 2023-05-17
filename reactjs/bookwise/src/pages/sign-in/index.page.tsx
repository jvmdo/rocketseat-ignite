import { ComponentProps } from 'react'
import { Hero } from '../sign-in/components/Hero'
import { ButtonGroup, HeadingGroup, S_SignIn, SignInOptions } from './styles'
import { AuthButton } from '@/components/AuthButton'

export interface SignInProps extends ComponentProps<typeof S_SignIn> {}

export default function SignIn() {
  return (
    <S_SignIn>
      <Hero />
      <SignInOptions>
        <HeadingGroup>
          <h1>Boas vindas!</h1>
          <p>Faça seu login ou acesse como visitante.</p>
        </HeadingGroup>
        <ButtonGroup>
          <AuthButton icon={{ name: 'google' }} text="Entra com Google" />
          <AuthButton icon={{ name: 'github' }} text="Entra com Github" />
          <AuthButton icon={{ name: 'rocket' }} text="Acessar como visitante" />
        </ButtonGroup>
      </SignInOptions>
    </S_SignIn>
  )
}
