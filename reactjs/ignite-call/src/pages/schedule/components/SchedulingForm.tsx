import { breakpoints } from '@/styles/globals'
import {
  Box,
  Button,
  Text,
  TextArea,
  TextInput,
  styled,
} from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import isEmail from 'validator/lib/isEmail'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationMessage } from '@/components/ValidationMessage'
import dayjs from 'dayjs'

/* 
  Styles
*/
const S_SchedulingForm = styled(Box, {
  display: 'grid',
  gap: '$6',

  maxWidth: '33.75rem',
  padding: '$3',

  [`@media (min-width: ${breakpoints.md})`]: {
    padding: '$4',
  },

  [`@media (min-width: ${breakpoints.lg})`]: {
    width: '33.75rem',
    padding: '$6',
  },

  '> hr': {
    border: 'none',
    borderBottom: '1px solid $gray600',
  },
})

const ScheduleInfo = styled('div', {
  display: 'flex',
  gap: '$4',

  '> span': {
    display: 'inline-flex',
    gap: '$2',
    alignItems: 'center',

    [`> ${Text}`]: {
      color: '$white !important',
    },
  },
})

const Form = styled('form', {
  display: 'grid',
  gap: '$6',

  '> div:last-of-type': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

const InputField = styled('div', {
  display: 'grid',
  gap: '$2',

  '> label': {
    color: '$white',
  },
})

/* 
  Component
*/
interface SchedulingFormProps {
  scheduleDate: dayjs.Dayjs
  onBackToCalendar: () => void
}

const SchedulingFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Insira pelo menos 3 caracteres' })
    .regex(/^[a-z-]+$/i, {
      message: 'Insira apenas letras ou traços (-)',
    })
    .transform((value) => value.toLowerCase()),
  email: z
    .string()
    .min(1, {
      message: 'Insira seu email',
    })
    .refine((value) => isEmail(value), {
      message: 'Formato de email incorreto',
    }),
  observations: z.string().nullable(),
})

type SchedulingFormData = z.infer<typeof SchedulingFormSchema>

export function SchedulingForm({
  scheduleDate,
  onBackToCalendar,
}: SchedulingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(SchedulingFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  function handleOnSubmit(data: SchedulingFormData) {
    console.log(data)
  }

  function handleCancelSubmit() {
    onBackToCalendar()
  }

  return (
    <S_SchedulingForm as="main" onSubmit={handleSubmit(handleOnSubmit)}>
      <ScheduleInfo>
        <span>
          <CalendarBlank size={20} />
          <Text as="span">{scheduleDate.format('DD[ de ]MMMM[ de ]YYYY')}</Text>
        </span>
        <span>
          <Clock size={20} />
          <Text as="span">{scheduleDate.format('HH[h]mm')}</Text>
        </span>
      </ScheduleInfo>
      <hr />
      <Form>
        <InputField>
          <label htmlFor="username">Seu nome de usuário</label>
          <TextInput
            id="username"
            prefix="ignite.com/"
            size="sm"
            {...register('username')}
          />
          <ValidationMessage
            name="username"
            errors={errors}
            css={{ marginTop: '-$2' }}
          />
        </InputField>
        <InputField>
          <label htmlFor="email">Endereço de email</label>
          <TextInput id="email" {...register('email')} type="email" />
          <ValidationMessage
            name="email"
            errors={errors}
            css={{ marginTop: '-$2' }}
          />
        </InputField>
        <InputField>
          <label htmlFor="observations">Observações</label>
          <TextArea id="observations" {...register('observations')} />
        </InputField>
        <div>
          <Button variant="tertiary" type="button" onClick={handleCancelSubmit}>
            Cancelar
          </Button>
          <Button>Confirmar</Button>
        </div>
      </Form>
    </S_SchedulingForm>
  )
}
