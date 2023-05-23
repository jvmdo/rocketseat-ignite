import { styled } from '@/styles/stitches.config'

export const S_ReviewForm = styled('form', {
  // TODO: change to $gray600 for currently user
  backgroundColor: '$gray700',
  borderRadius: '$sm',

  display: 'grid',
  gridAutoRows: 'auto 1fr',
  responsiveGap: ['$4', '$5', '$6'],

  marginBlockStart: '$4',
  responsivePaddingBlock: ['$3', '$4', '$5', '$6'],
  responsivePaddingInline: ['$3', '$4', '$5', '$6'],

  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    responsiveGap: ['$3', '$3', '$4'],
  },

  '.user-info': {
    display: 'flex',
    alignItems: 'center',
    responsiveGap: ['$3', '$3', '$4'],

    img: {
      border: '1px solid $colors$purple100',
      borderRadius: '50%',
      responsiveHeight: ['2rem', '2rem', '2.5rem'],
      responsiveWidth: ['2rem', '2rem', '2.5rem'],
    },

    h4: {
      color: '$gray100',
      lineHeight: '$short',
      responsiveFontSize: ['$sm', '$md'],
    },
  },

  // The actual Rating wrapper
  'header > span': {
    alignSelf: 'start',

    svg: {
      responsiveHeight: ['2rem', '2rem', '1.75rem'],
      responsiveWidth: ['2rem', '2rem', '1.75rem'],

      '&:not(:last-of-type)': {
        marginRight: 4,
      },
    },
  },

  '.body': {
    display: 'flex',
    flexDirection: 'column',
    responsiveGap: ['$2', '$3'],

    textarea: {
      backgroundColor: '$gray800',
      border: '1px solid $colors$gray500',
      borderRadius: '$xs',
      color: '$gray200',
      caretColor: '$green100',

      minHeight: '8.5rem',
      width: '100%',
      responsivePaddingBlock: ['$2', '$3', '$4'],
      responsivePaddingInline: ['$3', '$4', '$5'],
      resize: 'vertical',

      '&::placeholder': {
        color: '$gray400',
        fontSize: '$sm',
      },
    },

    button: {
      backgroundColor: '$gray600',
      borderRadius: '$xs',
      lineHeight: 0,

      responsivePaddingBlock: ['$1', '$2'],
      responsivePaddingInline: ['$1', '$2'],

      svg: {
        color: '$purple100',
        responsiveHeight: ['1.125rem', '1.25rem', '1.5rem'],
        responsiveWidth: ['1.125rem', '1.25rem', '1.5rem'],
      },

      '&:last-of-type': {
        svg: {
          color: '$green100',
        },
      },

      transition: 'background-color $action-in-out',

      '&:is(:hover, :focus-visible)': {
        backgroundColor: '$gray500',
      },
    },

    '.textarea-wrapper': {
      position: 'relative',

      '&::after': {
        color: '$gray400',
        fontSize: '$xs',

        counterReset: 'chars var(--chars-count, 0)',
        content: 'counter(chars)"/450"',

        position: 'absolute',
        insetBlockEnd: 0,
        insetInlineEnd: 0,
        padding: '$1 $2',
      },
    },

    '.buttons-wrapper': {
      alignSelf: 'end',
      display: 'inline-flex',
      responsiveGap: ['$4', '$4', '$3', '$2'],
    },
  },
})
