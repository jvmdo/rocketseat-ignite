import { Meta, StoryObj } from '@storybook/react'
import { MainLayout, MainLayoutProps } from '.'
import { SessionProvider } from 'next-auth/react'
import Home from '@/pages/home'
import { Explorer } from '@/pages/explorer'

export default {
  title: 'Layouts / MainLayout',
  component: MainLayout,
  decorators: [(Story) => <SessionProvider>{Story()}</SessionProvider>],
  args: {
    // children: <Home />,
    children: <Explorer />,
  },
} as Meta<MainLayoutProps>

export const Default = {} as StoryObj<MainLayoutProps>
