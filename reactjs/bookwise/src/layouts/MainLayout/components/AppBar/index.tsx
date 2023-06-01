import Image from 'next/image'
import { CollapsibleTrigger, S_AppBar, StaticContent } from './styles'
import { ComponentProps, useState } from 'react'
import { SpriteIcon } from '@/components/SpriteIcon'
import { Root as CollapsibleRoot } from '@radix-ui/react-collapsible'
import { NavBar } from './Components/NavBar'
import { useMediaQuery } from '@mantine/hooks'
import { config } from '@/styles/stitches.config'

const { media } = config

export interface AppBarProps extends ComponentProps<typeof S_AppBar> {}

export function AppBar() {
  const [open, setOpen] = useState(false)
  const isLargeScreen = useMediaQuery(media.lg)

  const collapsibleProps = isLargeScreen
    ? {
        open: true,
        defaultOpen: true,
        onOpenChange: undefined,
      }
    : {
        open,
        onOpenChange: setOpen,
      }
  const shouldDisplayTrigger = { '--display': isLargeScreen && 'none' }

  return (
    <CollapsibleRoot asChild {...collapsibleProps}>
      <S_AppBar>
        <StaticContent>
          <CollapsibleTrigger css={shouldDisplayTrigger}>
            <SpriteIcon name="hamburger" />
          </CollapsibleTrigger>
          <Image src="/logo.svg" width={128} height={32} alt="BookWise" />
        </StaticContent>
        <NavBar />
      </S_AppBar>
    </CollapsibleRoot>
  )
}
