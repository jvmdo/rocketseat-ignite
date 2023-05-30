import { Meta, StoryObj } from '@storybook/react'
import { SearchField, SearchFieldProps } from '.'

export default {
  title: 'Components / SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
} as Meta<SearchFieldProps>

export const Default = {} as StoryObj<SearchFieldProps>
