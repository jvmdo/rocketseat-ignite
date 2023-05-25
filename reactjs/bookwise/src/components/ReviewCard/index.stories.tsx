import { Meta, StoryObj } from '@storybook/react'
import { ReviewCard, ReviewCardProps } from '.'

export default {
  title: 'Components / ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'centered',
  },
} as Meta<ReviewCardProps>

export const Primary = {} as StoryObj<ReviewCardProps>
