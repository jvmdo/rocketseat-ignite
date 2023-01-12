import { useContext, useEffect } from 'react'
import { TimerContext } from '../../../../contexts/TimerContext'
import { FormContainer, TaskInput, TimeInput } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface TimerFormProps {
  onTaskValidnessChange: (isValid: boolean) => void
}

export function TimerForm({ onTaskValidnessChange }: TimerFormProps) {
  const { createNewTimer, activeTimerId } = useContext(TimerContext)

  const timerFormDataSchema = zod.object({
    task: zod
      .string()
      .trim()
      .min(1, { message: 'Task name must be at least one character long' }),
    minutes: zod
      .number({
        invalid_type_error: 'Duration must be a integer between 5 and 60',
      })
      .int()
      .gte(1)
      .lte(60),
  })

  type timerFormData = zod.infer<typeof timerFormDataSchema>

  const { register, handleSubmit, watch, reset, formState } =
    useForm<timerFormData>({
      resolver: zodResolver(timerFormDataSchema),
      defaultValues: {
        task: '',
        minutes: 5,
      },
    })

  function handleCreateNewTimer(data: timerFormData) {
    createNewTimer(data)
    reset()
  }

  useEffect(() => {
    // Callback version of watch
    // Update the button disabled state on every task input change
    const subscription = watch(({ task }, { name }) => {
      if (name === 'task') {
        onTaskValidnessChange(Boolean(task))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, onTaskValidnessChange])

  console.log('Form errors:', formState.errors)

  return (
    <FormContainer
      id="timerForm"
      method="post"
      onSubmit={handleSubmit(handleCreateNewTimer)}
    >
      <label htmlFor="task">I am working on</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Name your task"
        list="task-suggestions"
        {...register('task')}
        disabled={Boolean(activeTimerId)}
      />
      <datalist id="task-suggestions">
        <option>Placeholder 1</option>
        <option>Placeholder 2</option>
        <option>Placeholder 3</option>
      </datalist>

      <label htmlFor="minutes">for</label>
      <TimeInput
        type="number"
        id="minutes"
        min={5}
        max={60}
        step={5}
        {...register('minutes', { valueAsNumber: true })}
        disabled={Boolean(activeTimerId)}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
