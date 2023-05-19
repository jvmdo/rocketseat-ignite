import { Meta, StoryObj } from '@storybook/react'
import { AppBar, AppBarProps } from '.'
import { SessionProvider } from 'next-auth/react'

export default {
  title: 'Main Layout / AppBar',
  component: AppBar,
  decorators: [(Story) => <SessionProvider>{Story()}</SessionProvider>],
} as Meta<AppBarProps>

export const Default = {} as StoryObj<AppBarProps>
