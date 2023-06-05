import { Meta, StoryObj } from '@storybook/react'
import { MainLayout, MainLayoutProps } from '.'
import { SessionProvider } from 'next-auth/react'
// import Home from '@/pages/home/index.page'
// import Explorer from '@/pages/explorer/index.page'
// import Profile from '@/pages/profile/[id]/index.page'

export default {
  title: 'Layouts / MainLayout',
  component: MainLayout,
  decorators: [(Story) => <SessionProvider>{Story()}</SessionProvider>],
  args: {
    // children: <Home />,
    // children: <Explorer />,
    // children: <Profile />,
  },
} as Meta<MainLayoutProps>

export const Default = {} as StoryObj<MainLayoutProps>
