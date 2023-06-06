import { styled } from '@/styles/stitches.config'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

export const S_CategoryChips = styled(ToggleGroup.Root, {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  responsiveGap: ['$2', '$2', '$3'],

  '@md': { justifyContent: 'flex-start' },
})

export const ToggleChip = styled(ToggleGroup.Item, {
  borderRadius: '$full',
  border: '1px solid $colors$purple100',

  color: '$purple100',
  lineHeight: 1,
  responsiveFontSize: ['$xs', '$sm', '$md'],

  padding: '$1 $4',

  transition: 'all $action-in-out',

  '&:is(:hover, :focus-visible)': {
    backgroundColor: '$purple200',
    borderColor: '$purple100',
    color: '$gray100',
  },

  '&[data-state=on]': {
    backgroundColor: '$purple200',
    borderColor: '$purple200',
    color: '$gray100',
  },
})
