import {
  FormError,
  ReviewFormBody,
  ReviewFormHeader,
  S_ReviewForm,
} from './styles'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import { config } from '@/styles/stitches.config'
import { Check, Star, X } from '@phosphor-icons/react'
import { RefObject } from 'react'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { KeyedMutator } from 'swr'
import { api } from '@/lib/axios'
import { formatInitials } from '@/utils/format-initials'
import { EBookReview } from '@/@types/entities'

const { theme } = config

const ReviewFormSchema = z.object({
  bookId: z.string().uuid(),
  userId: z.string().uuid(),
  rate: z.number().min(0.5, { message: 'Rate your review.' }).max(5),
  description: z.string().min(1, { message: 'Write your review.' }).max(450),
})

type ReviewFormData = z.infer<typeof ReviewFormSchema>

interface ReviewFormProps {
  triggerRef: RefObject<HTMLButtonElement>
  bookId: string | undefined
  reviews: EBookReview[] | undefined
  mutate: KeyedMutator<EBookReview[]>
}

export function ReviewForm({
  triggerRef,
  bookId,
  reviews,
  mutate,
}: ReviewFormProps) {
  const { data: session } = useSession()
  const { handleSubmit, register, control, watch, formState } =
    useForm<ReviewFormData>({
      resolver: zodResolver(ReviewFormSchema),
      defaultValues: {
        bookId,
        userId: session?.user.id,
        rate: 0,
        description: '',
      },
    })
  const watchTextarea = watch('description')

  async function handlePostReview(newReview: ReviewFormData) {
    const optimisticReview: EBookReview = {
      id: crypto.randomUUID(),
      rate: newReview.rate,
      description: newReview.description,
      user: {
        id: newReview.userId,
        name: session?.user.name ?? '',
        image: session?.user.image ?? '',
      },
      createdAt: new Date(),
    }

    try {
      await api.post(`/books/${bookId}/reviews`, newReview)

      if (reviews) {
        await mutate(updater(bookId), {
          optimisticData: [...reviews, optimisticReview],
        })
      }
    } catch (error) {
      alert('Erro ao publicar avaliação')
      console.error(error)
    }

    handleCollapseClose()
  }

  function handleErrorSubmit(errors: FieldErrors) {
    alert('Erro ao publicar avaliação')
    console.error(errors)
  }

  function handleCollapseClose() {
    triggerRef.current?.click()
  }

  const { isSubmitting, errors } = formState
  const charsCount = { $$charsCount: `${watchTextarea.length}` }

  return (
    <S_ReviewForm onSubmit={handleSubmit(handlePostReview, handleErrorSubmit)}>
      <ReviewFormHeader>
        <div className="user-info">
          <Image
            src={session?.user.image ?? ''}
            width={40}
            height={40}
            alt={formatInitials(session?.user.name)}
          />
          <h4>{session?.user.name}</h4>
        </div>
        <Controller
          name="rate"
          control={control}
          render={({ field: { onChange } }) => (
            <Rating
              initialValue={0}
              transition
              allowFraction
              disableFillHover
              allowHover={false}
              emptyIcon={<Star />}
              emptyColor={theme.colors.purple100}
              fillIcon={<Star weight="fill" />}
              fillColor={theme.colors.purple100}
              onClick={onChange}
              onPointerMove={onChange}
              readonly={isSubmitting}
            />
          )}
        />
        <ErrorMessage
          name="rate"
          errors={errors}
          render={({ message }) => (
            <FormError className="rate">{message}</FormError>
          )}
        />
      </ReviewFormHeader>
      <ReviewFormBody css={charsCount}>
        <div className="textarea-wrapper">
          <textarea
            {...register('description')}
            maxLength={450}
            placeholder="Escreva sua avaliação"
            disabled={isSubmitting}
          />
          <ErrorMessage
            name="description"
            errors={errors}
            render={({ message }) => (
              <FormError className="description">{message}</FormError>
            )}
          />
        </div>
        <div className="buttons-wrapper">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleCollapseClose}
          >
            <X />
          </button>
          <button disabled={isSubmitting}>
            <Check />
          </button>
        </div>
      </ReviewFormBody>
    </S_ReviewForm>
  )
}

async function updater(bookId: string | undefined) {
  return (await api.get(`/books/${bookId}/reviews`)).data
}
