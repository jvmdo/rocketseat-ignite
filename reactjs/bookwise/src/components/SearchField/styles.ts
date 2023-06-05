import { styled } from '@/styles/stitches.config'

export const S_SearchField = styled('div', {
  backgroundColor: '$gray800',
  borderRadius: '$xs',
  border: '1px solid $colors$gray500',

  responsivePaddingBlock: ['$3', '$3', '$4'],
  responsivePaddingInline: ['$4', '$4', '$5'],

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  input: {
    flex: 1,

    backgroundColor: 'inherit',
    border: 'none',
    color: '$gray200',
    outline: 'none',

    lineHeight: '$base',
    responsiveFontSize: ['$xs', '$xs', '$sm'],

    '&::placeholder': { color: '$gray400' },
  },

  svg: {
    color: '$gray500',
    responsiveHeight: ['1rem', '1rem', '1.25rem'],
    responsiveWidth: ['1rem', '1rem', '1.25rem'],
  },

  '&:is(:focus-within, :focus-visible)': {
    borderColor: '$green200',
    caretColor: '$green200',
    svg: { color: '$green200' },
  },

  '& input:disabled': { color: '$gray400' },
})
