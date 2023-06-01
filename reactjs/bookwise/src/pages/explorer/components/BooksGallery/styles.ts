import { keyframes, styled } from '@/styles/stitches.config'

const spinner = keyframes({
  to: { transform: 'rotate(360deg)' },
})

export const S_BooksGallery = styled('ol', {
  $$gridGap: 'clamp(0.75rem, 0.393rem + 1.79vw, 1.25rem)', // from @initial to @md
  $$gridColumnCount: 3,
  $$itemMinWidth: '16rem',

  $$gapCount: 'calc($$gridColumnCount - 1)',
  $$totalGapWidth: 'calc($$gapCount * $$gridGap)',
  $$itemMaxWidth: 'calc((100% - $$totalGapWidth) / $$gridColumnCount)',

  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fill, minmax(max($$itemMinWidth, $$itemMaxWidth), 1fr))',
  gridGap: '$$gridGap',

  variants: {
    withSpinner: {
      true: {
        opacity: 0.4,
        position: 'relative',

        '&::before': {
          content: '',

          border: '2px solid $colors$green300',
          borderRadius: '$full',
          borderTopColor: '$green100',

          blockSize: 'clamp(1.25rem, 0.795rem + 2.27vw, 2.5rem)',
          inlineSize: 'clamp(1.25rem, 0.795rem + 2.27vw, 2.5rem)',

          marginBlockStart: '-0.75rem',
          marginInlineStart: '-0.75rem',

          position: 'absolute',
          insetBlockStart: '20vh',
          insetInlineStart: '50%',
          zIndex: '92',

          animation: `${spinner} 0.6s linear infinite`,
        },
      },
    },
  },
})
