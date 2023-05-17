import type { Meta, StoryObj } from '@storybook/react'
import { Hero, HeroProps } from '.'

export default {
  title: 'Sign In/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
  },
} as Meta<HeroProps>

export const Default = {} as StoryObj<HeroProps>
