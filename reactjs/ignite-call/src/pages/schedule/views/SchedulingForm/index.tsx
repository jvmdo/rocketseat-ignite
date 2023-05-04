import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import isEmail from 'validator/lib/isEmail'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationMessage } from '@/components/ValidationMessage'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { Form, InputField, S_SchedulingForm, ScheduleInfo } from './styled'

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
