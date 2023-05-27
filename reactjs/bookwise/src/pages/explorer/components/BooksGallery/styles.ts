import { styled } from '@/styles/stitches.config'

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
})
