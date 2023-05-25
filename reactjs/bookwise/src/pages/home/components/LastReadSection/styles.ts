import { styled } from '@/styles/stitches.config'

export const S_LastReadSection = styled('section', {
  display: 'grid',
  gridAutoRows: 'min-content 1fr',
  responsiveGap: ['$2', '$2', '$3'],

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$5',

    h3: {
      color: '$gray100',
      fontWeight: '$regular',
      lineHeight: '$base',
      responsiveFontSize: ['$xs', '$sm'],
    },
  },
})
