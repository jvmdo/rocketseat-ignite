import { keyframes, styled } from '@/styles/stitches.config'
import { Content } from '@radix-ui/react-collapsible'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { AuthFoot } from '../AuthFoot'

const slideDown = keyframes({
  from: {
    height: 0,
  },
  to: {
    height: 'var(--radix-collapsible-content-height)',
  },
})

const slideUp = keyframes({
  from: {
    height: 'var(--radix-collapsible-content-height)',
  },
  to: {
    height: 0,
  },
})

export const CollapsibleContent = styled(Content, {
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${slideDown} $transitions$collapse`,

    [`${AuthFoot}`]: { opacity: 1 },
  },

  '&[data-state="closed"]': {
    animation: `${slideUp} $transitions$collapse`,

    [`${AuthFoot}`]: { opacity: 0 },
  },

  '&::before': {
    content: '',
    display: 'block',
    height: '0.75rem',
    borderBottom: '1px solid $colors$green200',

    '@lg': {
      content: 'unset',
    },
  },

  '@lg': {
    overflow: 'unset',
  },
})

export const NavigationMenuRoot = styled(NavigationMenu.Root, {
  responsivePaddingInline: ['$10', '$10', '$10', '$0'],
  responsiveMarginBlock: ['$0', '$0', '$0', ['$16', '$0']],
})

export const NavigationMenuList = styled(NavigationMenu.List, {
  display: 'flex',
  flexDirection: 'column',
  responsiveGap: ['$2', '$2', '$2', '$6'],
  responsiveMarginBlock: [['$4', '$0'], ['$4', '$0'], ['$4', '$0'], '$0'],
})
