import { Meta, StoryObj } from '@storybook/react'
import { LinkWrapper, LinkWrapperProps } from '.'

export default {
  title: 'Components / LinkWrapper',
  component: LinkWrapper,
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '/',
    children: <p>Link</p>,
  },
} as Meta<LinkWrapperProps>

export const Primary = {} as StoryObj<LinkWrapperProps>
