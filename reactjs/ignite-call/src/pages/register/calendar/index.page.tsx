import { Box, Text, Button } from '@ignite-ui/react'
import { StepInstructions } from '../components/StepInstructions'
import { ArrowRight } from 'phosphor-react'
import { CalendarConnectionBox, S_Calendar } from './styles'
import { useRouter } from 'next/router'
import { Message } from '@/components/ValidationMessage'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { AppContainer } from '@/components/AppContainer'

export default function Calendar() {
  const router = useRouter()
  const session = useSession()

  const isSignedIn = session.status === 'authenticated'
  const hasPermissionError = router.query.error

  useEffect(() => {
    // Clear the query param out from URL if sign in is successful
    if (isSignedIn) {
      router.push(router.pathname, undefined, {
        shallow: true,
      })
    }
  }, [isSignedIn])

  async function handleAuthSignIn() {
    await signIn('google')
  }

  return (
    <AppContainer>
      <StepInstructions
        title="Conecte sua agenda!"
        body="Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados."
        step={2}
      />
      <S_Calendar>
        <CalendarConnectionBox>
          <Box>
            <Text as="span">Google Agenda</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
              </Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={handleAuthSignIn}>
                Conectar
                <ArrowRight size={20} />
              </Button>
            )}
          </Box>
          {hasPermissionError && (
            <Message css={{ marginTop: '-0.75rem' }}>
              Falha ao se conectar a sua conta Google. Verifique se você
              habilitou as permissões de acesso ao Google Calendar.
            </Message>
          )}
          <Button disabled={!isSignedIn}>
            Próximo passo <ArrowRight size={20} weight="bold" />
          </Button>
        </CalendarConnectionBox>
      </S_Calendar>
    </AppContainer>
  )
}
