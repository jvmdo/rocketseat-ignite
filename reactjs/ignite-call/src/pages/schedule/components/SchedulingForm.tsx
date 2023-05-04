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
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

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
  guestName: z.string().regex(/^[a-zA-Z]+(?:['., -][a-zA-Z]+)*$/, {
    message: 'Insira um nome válido',
  }),
  guestEmail: z
    .string()
    .min(1, {
      message: 'Email do convidado é obrigatório',
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
    formState: { errors, isSubmitting },
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(SchedulingFormSchema),
    defaultValues: {
      guestName: '',
      guestEmail: '',
    },
  })
  const router = useRouter()

  async function handleOnSubmit(data: SchedulingFormData) {
    const username = String(router.query.username)
    const { guestName, guestEmail, observations } = data

    await api.post(`/users/${username}/schedule`, {
      guestName,
      guestEmail,
      observations,
      date: scheduleDate.toISOString(),
    })

    onBackToCalendar()
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
          <label htmlFor="guestName">Nome do convidado</label>
          <TextInput id="guestName" {...register('guestName')} />
          <ValidationMessage
            name="guestName"
            errors={errors}
            css={{ marginTop: '-$2' }}
          />
        </InputField>
        <InputField>
          <label htmlFor="guestEmail">Endereço de email do convidado</label>
          <TextInput id="guestEmail" {...register('guestEmail')} type="email" />
          <ValidationMessage
            name="guestEmail"
            errors={errors}
            css={{ marginTop: '-$2' }}
          />
        </InputField>
        <InputField>
          <label htmlFor="observations">Observações</label>
          <TextArea id="observations" {...register('observations')} />
        </InputField>
        <div>
          <Button
            variant="tertiary"
            type="button"
            onClick={handleCancelSubmit}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button disabled={isSubmitting}>Confirmar</Button>
        </div>
      </Form>
    </S_SchedulingForm>
  )
}
