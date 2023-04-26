import { Button, TextInput } from '@ignite-ui/react'
import { StepInstructions } from './components/StepInstructions'
import { ArrowRight } from 'phosphor-react'
import { RegistrationBox, S_Register } from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationMessage } from '@/components/ValidationMessage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { AppContainer } from '@/components/AppContainer'

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Insira pelo menos 3 caracteres' })
    .regex(/^[a-z-]+$/i, {
      message: 'Insira apenas letras ou traços (-)',
    })
    .transform((value) => value.toLowerCase()),
  name: z.string().regex(/^[a-zA-Z]+(?:['., -][a-zA-Z]+)*$/, {
    message: 'Insira um nome válido',
  }),
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
    },
  })
  const router = useRouter()

  useEffect(() => {
    const { username } = router.query
    if (typeof username === 'string') {
      setValue('username', username)
    }
  }, [router.query, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', data)
      router.push('/register/calendar')
    } catch (err) {
      const e = err as AxiosError<{ message: string }>
      if (e.response?.data.message) {
        return alert(e.response.data.message)
      }
    }
  }

  return (
    <AppContainer>
      <StepInstructions
        title="Bem-vindo ao Ignite Call!"
        body="Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois."
        step={1}
      />
      <S_Register>
        <RegistrationBox as="form" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label htmlFor="username">Nome de usuário</label>
            <TextInput
              id="username"
              prefix="ignite.com/"
              size="sm"
              {...register('username')}
            />
            <ValidationMessage name="username" errors={errors} />
          </div>
          <div>
            <label htmlFor="name">Nome completo</label>
            <TextInput id="name" {...register('name')} />
            <ValidationMessage name="name" errors={errors} />
          </div>
          <Button disabled={isSubmitting}>
            Próximo passo <ArrowRight size={20} weight="bold" />
          </Button>
        </RegistrationBox>
      </S_Register>
    </AppContainer>
  )
}
