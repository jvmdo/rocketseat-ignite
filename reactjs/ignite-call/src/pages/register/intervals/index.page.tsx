import { AppContainer } from '@/components/AppContainer'
import { StepInstructions } from '../components/StepInstructions'
import { IntervalsInnerBox, IntervalsItem, IntervalsOuterBox } from './styles'
import { Button, Checkbox, Text, TextInput } from '@ignite-ui/react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { Formatter } from '@/utils/formatter'

export default function Intervals() {
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, checked: false, start: '08:00', end: '17:00' },
        { weekday: 1, checked: false, start: '08:00', end: '17:00' },
        { weekday: 2, checked: false, start: '08:00', end: '17:00' },
        { weekday: 3, checked: false, start: '08:00', end: '17:00' },
        { weekday: 4, checked: false, start: '08:00', end: '17:00' },
        { weekday: 5, checked: false, start: '08:00', end: '17:00' },
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
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
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
                  step={60}
                  inputMode="numeric"
                  {...register(`intervals.${index}.start` as const)}
                  disabled={!inputs[index].checked}
                />
                <TextInput
                  type="time"
                  step={60}
                  inputMode="numeric"
                  disabled={!inputs[index].checked}
                  {...register(`intervals.${index}.end` as const)}
                />
              </div>
            </IntervalsItem>
          ))}
        </IntervalsInnerBox>
        <Button type="submit" form="intervals" disabled={isSubmitting}>
          Próximo passo <ArrowRight size={20} weight="bold" />
        </Button>
      </IntervalsOuterBox>
    </AppContainer>
  )
}
