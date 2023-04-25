import { breakpoints } from '@/styles/globals'
import { ErrorMessage } from '@hookform/error-message'
import { styled, Text } from '@ignite-ui/react'
import { ComponentProps } from 'react'

/* 
  Styles
*/
export const Message = styled(Text, {
  color: '#F75A68 !important',
  fontSize: '$xs !important',

  [`@media (min-width: ${breakpoints.lg})`]: {
    fontSize: '$sm !important',
  },
})

/* 
  Component
*/
interface ValidationMessageProps
  extends ComponentProps<typeof ErrorMessage>,
    ComponentProps<typeof Message> {}

export function ValidationMessage({
  name, // Why does TS autocomplete not work for name prop?
  errors,
  css,
}: ValidationMessageProps) {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <Message as="span" css={css}>
          {message}
        </Message>
      )}
    />
  )
}
