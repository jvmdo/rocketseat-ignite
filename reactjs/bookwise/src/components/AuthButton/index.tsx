import { ComponentProps } from 'react'
import { S_AuthButton } from './styles'
import { SpriteIcon, SpriteIconProps } from '../SpriteIcon'

export interface AuthButtonProps extends ComponentProps<typeof S_AuthButton> {
  icon: SpriteIconProps
  text: string
}

export function AuthButton({ icon, text, ...props }: AuthButtonProps) {
  return (
    <S_AuthButton type="button" {...props}>
      <SpriteIcon {...icon} />
      <span>{text}</span>
    </S_AuthButton>
  )
}
