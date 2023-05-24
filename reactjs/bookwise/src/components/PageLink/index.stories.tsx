import { Meta, StoryObj } from '@storybook/react'
import { PageLink, PageLinkProps } from '.'
import { CaretRight } from '@phosphor-icons/react'

export default {
  title: 'Components / PageLink',
  component: PageLink,
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '/',
    children: (
      <>
        <span>Page Link</span>
        <CaretRight />
      </>
    ),
  },
} as Meta<PageLinkProps>

export const White = {} as StoryObj<PageLinkProps>

export const Purple = {
  args: {
    color: 'purple',
  },
} as StoryObj<PageLinkProps>
