import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer, TaskInput, TimeInput } from './styles'

export function Home() {
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
      .gte(5)
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

  const isTaskFieldValid = !watch('task')

  function handleTimerFormSubmit(data: timerFormData) {
    console.log(data)
    reset()
  }

  console.log(formState.errors)

  return (
    <HomeContainer>
      <form
        id="timerForm"
        method="post"
        onSubmit={handleSubmit(handleTimerFormSubmit)}
      >
        <label htmlFor="task">I am working on</label>
        <TaskInput
          type="text"
          id="task"
          placeholder="Name your task"
          list="task-suggestions"
          {...register('task')}
        />
        <datalist id="task-suggestions">
          <option>Placeholder 1</option>
          <option>Placeholder 2</option>
          <option>Placeholder 3</option>
          <option>Piroca</option>
        </datalist>
        <label htmlFor="minutes">for</label>
        <TimeInput
          type="number"
          id="minutes"
          placeholder="00"
          min={5}
          max={60}
          step={5}
          {...register('minutes', { valueAsNumber: true })}
        />
        <span>minutes.</span>
      </form>
      <div className="display">
        <span className="digit">0</span>
        <span className="digit">0</span>
        <b className="separator">:</b>
        <span className="digit">0</span>
        <span className="digit">0</span>
      </div>
      <button type="submit" form="timerForm" disabled={isTaskFieldValid}>
        <Play size={24} /> Start
      </button>
    </HomeContainer>
  )
}
