import { keyframes, styled } from '@/styles/stitches.config'
import { Content } from '@radix-ui/react-collapsible'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { AuthFoot } from '../AuthFoot'

export const NavigationMenuRoot = styled(NavigationMenu.Root, {
  responsivePaddingInline: ['$10', '$10', '$10', '$0'],
  responsiveMarginBlock: ['$0', '$0', '$0', ['$16', '$0']],

  '@lg': {
    // There is an unknown div between Root and List which shouldn't be there
    // By setting grid here, this div inherits the Root's total height
    display: 'grid',

    '> div': {
      width: 'fit-content',
      justifySelf: 'center',
    },

    [`${AuthFoot}`]: {
      alignSelf: 'end',
    },
  },
})

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

export const NavigationMenuList = styled(NavigationMenu.List, {
  display: 'flex',
  flexDirection: 'column',
  responsiveGap: ['$2', '$2', '$2', '$6'],
  responsiveMarginBlock: ['$4', '$4', '$4', '$0'],
})

export const CollapsibleContent = styled(Content, {
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${slideDown} $transitions$action-in-out`,
  },

  '&[data-state="closed"]': {
    animation: `${slideUp} $transitions$collapse`,
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
