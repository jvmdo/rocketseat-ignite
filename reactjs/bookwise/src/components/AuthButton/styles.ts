import { styled } from '@/styles/stitches.config'
import { SpriteIcon } from '../SpriteIcon'

export const S_AuthButton = styled('button', {
  backgroundColor: '$gray600',
  borderRadius: '$sm',

  display: 'inline-flex',
  gap: '$5',
  alignItems: 'center',

  maxHeight: '4.5rem',
  responsivePaddingBlock: ['$3', '$3', '$4', '$5'],
  responsivePaddingInline: ['$5', '$5', '$6', '$6'],
  width: 'min(100cqw, 23.25rem)',

  transition: 'background-color $action-in-out',

  '&:is(:hover, :focus-visible)': {
    backgroundColor: 'color-mix(in srgb, $gray600 50%, $gray500)',
  },

  [`${SpriteIcon}`]: {
    height: 32,
    width: 32,
  },

  span: {
    color: '$gray200',
    fontWeight: '$bold',
    lineHeight: '$base',
    responsiveFontSize: ['$sm', '$sm', '$md', '$lg'],
  },
})
