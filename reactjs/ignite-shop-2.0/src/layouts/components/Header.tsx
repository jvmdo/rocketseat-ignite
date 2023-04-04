import { ContentContainer } from '@/components/ContentContainer'
import { styled, config } from '@/styles/stitches.config'
import { BadgeUnstyled as Badge, badgeUnstyledClasses } from '@mui/base'
import { CSSProperties } from '@stitches/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Handbag } from 'phosphor-react'
import ShopLogo from 'public/logo.svg'

const { fontSizes } = config.theme

/* 
  Styles
*/
const S_CartButton = styled('button', {
  backgroundColor: '$gray800',
  borderRadius: '$rg',
  height: 'min($heightHeaderFooter, 3rem)',
  width: '3rem',
  marginRight: '0.75rem',
  position: 'relative',

  '& svg': {
    color: '$gray400',
  },

  '&:is(:hover, :focus-visible)': {
    '& svg': {
      color: '$gray300',
    },
  },

  [`& .${badgeUnstyledClasses.badge}`]: {
    backgroundColor: '$green500',
    border: '3px solid $gray900',
    borderRadius: '100vh',
    color: '$white',
    fluidFontSize: { min: fontSizes.xs, max: fontSizes.sm, viewportUnit: 'vw' },
    fontWeight: 'bold',
    lineHeight: '1',
    minWidth: '1.75rem',
    padding: '0.25rem',

    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
  },

  [`& .${badgeUnstyledClasses.invisible}`]: {
    display: 'none',
  },
})

const S_Logo = styled(Image, {
  width: 'auto',
  height: '$heightHeaderFooter',
})

const S_Header = styled('header', {
  [`& ${ContentContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'var(--jc, space-between)',
  },
})

/* 
  Component
*/
interface HeaderProps {
  openDrawer: (open: boolean) => void
}

export function Header({ openDrawer }: HeaderProps) {
  const { pathname } = useRouter()

  const isSuccessRoute = pathname === '/success'
  const justifyContent = isSuccessRoute ? { '--jc': 'center' } : {}

  return (
    <S_Header style={justifyContent as CSSProperties}>
      <ContentContainer>
        <S_Logo src={ShopLogo.src} width={130} height={52} alt="" />
        {!isSuccessRoute && (
          <S_CartButton onClick={() => openDrawer(true)}>
            <Badge badgeContent={3} max={9}>
              <Handbag size={24} weight="bold" />
            </Badge>
          </S_CartButton>
        )}
      </ContentContainer>
    </S_Header>
  )
}
