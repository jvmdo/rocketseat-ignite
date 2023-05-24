import { Meta, StoryObj } from '@storybook/react'
import { LinkWrapper, LinkWrapperProps } from '.'
import { LastReadCard } from '../LastReadCard'

export default {
  title: 'Components / LinkWrapper',
  component: LinkWrapper,
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '/',
    children: (
      <LastReadCard
        imgSrc="/images/books/o-guia-do-mochileiro-das-galaxias.png"
        title="O guia do mochileiro das galáxias"
        author="Douglas Adams"
        rate={5}
        review="The best book I've ever seen in the library shelf!"
        date="2023-04-23T23:23:23"
        description="I have no words to describe such a masterpiece,"
      />
    ),
  },
} as Meta<LinkWrapperProps>

export const Primary = {} as StoryObj<LinkWrapperProps>
