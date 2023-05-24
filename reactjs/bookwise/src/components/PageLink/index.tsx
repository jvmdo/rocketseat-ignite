import { ComponentProps } from 'react'
import { S_PageLink } from './styles'

export interface PageLinkProps extends ComponentProps<typeof S_PageLink> {}

export function PageLink({ children, ...props }: PageLinkProps) {
  return <S_PageLink {...props}>{children}</S_PageLink>
}
