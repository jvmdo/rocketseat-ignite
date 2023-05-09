import { Meta, StoryObj } from '@storybook/react'
import { MyComponent, MyComponentProps } from './Hello'

export default {
  title: 'Hello',
  component: MyComponent,
} as Meta<MyComponentProps>

export const Primary = {
  args: {
    userName: 'Victor',
    bookName: 'Eita Bicho',
    bookCover: 'arquitetura-limpa.png',
    bookSummary:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ipsam non libero quaerat mollitia voluptate. Nemo nam iure magni cumque doloribus! Possimus a cumque quod voluptatum! Eligendi hic soluta labore.',
    updatedAt: new Date().toUTCString(),
  },
} as StoryObj<MyComponentProps>
