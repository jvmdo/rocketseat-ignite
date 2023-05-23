import { Meta, StoryObj } from '@storybook/react'
import { BookCard, BookCardProps } from '.'

export default {
  title: 'Components / BookCard',
  component: BookCard,
  parameters: {
    layout: 'centered',
  },
} as Meta<BookCardProps>

export const Small = {} as StoryObj<BookCardProps>

export const Big = {
  args: {
    size: 'big',
  },
} as StoryObj<BookCardProps>
