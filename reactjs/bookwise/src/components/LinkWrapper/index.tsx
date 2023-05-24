import { ComponentProps } from 'react'
import { S_LinkWrapper } from './styles'

export interface LinkWrapperProps
  extends ComponentProps<typeof S_LinkWrapper> {}

export function LinkWrapper({ children, ...props }: LinkWrapperProps) {
  return <S_LinkWrapper {...props}>{children}</S_LinkWrapper>
}
