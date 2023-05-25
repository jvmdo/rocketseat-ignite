import { Meta, StoryObj } from '@storybook/react'
import { RecentBookReviews, RecentBookReviewsProps } from '.'

export default {
  title: 'Home / RecentBookReviews',
  component: RecentBookReviews,
  parameters: {
    layout: 'centered',
  },
} as Meta<RecentBookReviewsProps>

export const Default = {} as StoryObj<RecentBookReviewsProps>
