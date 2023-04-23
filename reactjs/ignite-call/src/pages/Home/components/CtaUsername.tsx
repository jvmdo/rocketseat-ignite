import { Box, Button, Text, TextInput, styled } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { breakpoints } from '@/styles/globals'

/* 
  Styles
*/
const Cta = styled(Box, {
  display: 'grid',
  rowGap: '$2',
  marginTop: '1rem',
  padding: '$4',

  [`@media (orientation: landscape)`]: {
    alignItems: 'center',
    gridTemplateColumns: '5fr 2fr',
    columnGap: '$4',
  },

  [`> ${Button}`]: {
    fontWeight: '$bold',
  },
})

export const ValidationMessage = styled(Text, {
  color: '#F75A68 !important',
  fontSize: '$xs !important',
  paddingLeft: '$4',

  [`@media (min-width: ${breakpoints.lg})`]: {
    fontSize: '$sm !important',
  },
})

export const FormWrapper = styled('div', {
  display: 'grid',
  gridTemplateRows: 'auto 0rem',
  transition: '200ms ease-out',

  '&.hasError': {
    gridTemplateRows: 'auto 1rem',
  },
})

/* 
  Component
*/
const CtaUsernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Insira pelo menos 3 caracteres' })
    .regex(/^[a-z-]+$/i, {
      message: 'Insira apenas letras ou traços (-)',
    })
    .transform((value) => value.toLowerCase()),
})

type CtaFormData = z.infer<typeof CtaUsernameSchema>

export function CtaUsername() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CtaFormData>({
    resolver: zodResolver(CtaUsernameSchema),
    defaultValues: {
      username: '',
    },
  })

  async function handleCtaForm(data: CtaFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    reset()
  }

  return (
    <FormWrapper className={errors.username ? 'hasError' : ''}>
      <Cta as="form" onSubmit={handleSubmit(handleCtaForm)}>
        <TextInput
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button disabled={isSubmitting}>
          Reservar <ArrowRight size={20} weight="bold" />
        </Button>
      </Cta>
      <ErrorMessage
        errors={errors}
        name="username"
        render={({ message }) => (
          <ValidationMessage as="span">{message}</ValidationMessage>
        )}
      />
    </FormWrapper>
  )
}
