import { Meta, StoryObj } from '@storybook/react'
import { LastReadCard, LastReadCardProps } from '.'

export default {
  title: 'Components / LastReadCard',
  component: LastReadCard,
  parameters: {
    layout: 'centered',
  },
} as Meta<LastReadCardProps>

export const Default = {} as StoryObj<LastReadCardProps>
