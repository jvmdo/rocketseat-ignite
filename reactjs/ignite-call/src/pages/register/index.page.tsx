import { Button, MultiStep, TextInput } from '@ignite-ui/react'
import { StepInstructions } from './components/StepInstructions'
import { ArrowRight } from 'phosphor-react'
import { S_Box, S_Register } from './styles'
import { ContentContainer } from '@/components/ContentContainer'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationMessage } from '@/components/ValidationMessage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
    reset,
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
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    reset()
  }

  return (
    <S_Register>
      <ContentContainer>
        <StepInstructions
          title="Bem-vindo ao Ignite Call!"
          body="Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois."
        />
        <MultiStep size={4} currentStep={1} />
        <S_Box as="form" onSubmit={handleSubmit(handleRegister)}>
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
        </S_Box>
      </ContentContainer>
    </S_Register>
  )
}
