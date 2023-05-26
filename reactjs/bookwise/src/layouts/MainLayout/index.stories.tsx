import { Meta, StoryObj } from '@storybook/react'
import { MainLayout, MainLayoutProps } from '.'
import { SessionProvider } from 'next-auth/react'
import Home from '@/pages/home'

export default {
  title: 'Layouts / MainLayout',
  component: MainLayout,
  decorators: [(Story) => <SessionProvider>{Story()}</SessionProvider>],
  args: {
    children: <Home />,
  },
} as Meta<MainLayoutProps>

export const Default = {} as StoryObj<MainLayoutProps>
