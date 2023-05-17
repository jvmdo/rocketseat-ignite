import { Meta, StoryObj } from '@storybook/react'
import { AuthButton, AuthButtonProps } from '.'

export default {
  title: 'Components/AuthButton',
  component: AuthButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'Entrar como visitante',
    icon: {
      name: 'rocket',
    },
  },
  argTypes: {
    text: {
      control: {
        type: 'radio',
      },
      options: [
        'Entrar com Google',
        'Entrar com GitHub',
        'Acessar como visitante',
      ],
    },
  },
} as Meta<AuthButtonProps>

export const Default = {} as StoryObj<AuthButtonProps>
