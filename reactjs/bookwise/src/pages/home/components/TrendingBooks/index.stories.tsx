import { Meta, StoryObj } from '@storybook/react'
import { TrendingBooks, TrendingBooksProps } from '.'

export default {
  title: 'Home / TrendingBooks',
  component: TrendingBooks,
  parameters: {
    layout: 'centered',
  },
} as Meta<TrendingBooksProps>

export const Primary = {} as StoryObj<TrendingBooksProps>
