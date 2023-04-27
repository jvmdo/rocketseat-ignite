import { AppContainer } from '@/components/AppContainer'
import { StepInstructions } from '../components/StepInstructions'
import { IntervalsInnerBox, IntervalsItem, IntervalsOuterBox } from './styles'
import { Button, Checkbox, Text, TextInput } from '@ignite-ui/react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { Formatter } from '@/utils/formatter'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationMessage } from '@/components/ValidationMessage'

const IntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekday: z.number().min(0).max(6),
        checked: z.boolean(),
        start: z.string(),
        end: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter(({ checked }) => checked))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana.',
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekday: interval.weekday,
        startInMinutes: Formatter.calendarTimeToMinutes(interval.start),
        endInMinutes: Formatter.calendarTimeToMinutes(interval.end),
      })),
    )
    .refine(
      (intervals) =>
        intervals.every(
          ({ startInMinutes, endInMinutes }) => endInMinutes > startInMinutes,
        ),
      {
        message:
          'O horário de término não pode ser menor ou igual ao horário de início',
      },
    ),
})

type IntervalsFormData = z.input<typeof IntervalsFormSchema>
type IntervalsFormDataValidated = z.output<typeof IntervalsFormSchema>

export default function Intervals() {
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<IntervalsFormData>({
    resolver: zodResolver(IntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekday: 0, checked: false, start: '08:00', end: '17:00' },
        { weekday: 1, checked: true, start: '08:00', end: '17:00' },
        { weekday: 2, checked: true, start: '08:00', end: '17:00' },
        { weekday: 3, checked: true, start: '08:00', end: '17:00' },
        { weekday: 4, checked: true, start: '08:00', end: '17:00' },
        { weekday: 5, checked: true, start: '08:00', end: '17:00' },
        { weekday: 6, checked: false, start: '08:00', end: '17:00' },
      ],
    },
  })
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })
  const inputs = useWatch({
    control,
    name: 'intervals',
  })

  async function handleOnSubmit(data: any) {
    const validatedData = data as IntervalsFormDataValidated
    await new Promise((resolve) => setTimeout(resolve, 250))
    console.log(validatedData)
  }

  return (
    <AppContainer>
      <StepInstructions
        title="Quase lá"
        body="Defina o intervalo de horários que você está disponível em cada dia da semana."
        step={3}
      />
      <IntervalsOuterBox as="main">
        <IntervalsInnerBox
          as="form"
          id="intervals"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          {fields.map((field, index) => (
            <IntervalsItem key={field.id}>
              <div>
                <Controller
                  control={control}
                  name={`intervals.${index}.checked`}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      id={String(field.weekday)}
                      checked={value}
                      onCheckedChange={(checked) => onChange(checked === true)}
                    />
                  )}
                />
                <Text as="label" htmlFor={String(field.weekday)}>
                  {Formatter.weekdayName(field.weekday)}
                </Text>
              </div>
              <div>
                <TextInput
                  type="time"
                  inputMode="numeric"
                  {...register(`intervals.${index}.start` as const)}
                  disabled={!inputs[index].checked}
                />
                <TextInput
                  type="time"
                  inputMode="numeric"
                  disabled={!inputs[index].checked}
                  {...register(`intervals.${index}.end` as const)}
                />
              </div>
            </IntervalsItem>
          ))}
        </IntervalsInnerBox>
        <ValidationMessage
          name="intervals"
          errors={errors}
          css={{ marginTop: '-$3' }}
        />
        <Button type="submit" form="intervals" disabled={isSubmitting}>
          Próximo passo <ArrowRight size={20} weight="bold" />
        </Button>
      </IntervalsOuterBox>
    </AppContainer>
  )
}
