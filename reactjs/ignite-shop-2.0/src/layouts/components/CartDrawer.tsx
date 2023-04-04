import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { styled, config } from '@/styles/stitches.config'
import { X } from 'phosphor-react'
import { BrandButton } from '@/components/BrandButton'
import { CartDrawerItem } from './CartDrawerItem'
import Shirt01 from 'public/01-shirt.png'
import Shirt02 from 'public/02-shirt.png'
import Shirt03 from 'public/03-shirt.png'

const { fontSizes } = config.theme

/* 
  Styles
*/
const S_SwipeableDrawer = styled(SwipeableDrawer, {
  '& .MuiDrawer-paper': {
    backgroundColor: '$gray800',
    color: '$gray100',

    paddingBlock: 'min(4vmin, 1.5rem) clamp(1.5rem, 0.588rem + 3.89vmin, 3rem)',
    paddingInline: 'clamp(0.75rem, -0.618rem + 5.83vw, 3rem)',
    width: 'min(70vw, 30rem)',

    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    fluidGap: { min: 0.75, max: 1.5 },
  },

  '& header': {
    display: 'flex',
    justifyContent: 'flex-end',
    lineHeight: 1,

    '& svg': {
      color: '$gray400',
    },
  },

  '& main': {
    display: 'flex',
    flexDirection: 'column',
    fluidGap: { min: 1, max: 1.5 },

    overflow: 'auto',
    scrollbarWidth: 'none' /* Hide the scrollbar in Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none' /* Hide the scrollbar in Chrome, Edge and Safari */,
    },

    '& h2': {
      fluidFontSize: { min: fontSizes.rg, max: fontSizes.lg },
    },

    '& ul': {
      display: 'flex',
      flexDirection: 'column',
      fluidGap: { min: 0.75, max: 1.5 },
    },
  },

  '& footer': {
    display: 'flex',
    flexDirection: 'column',
    fluidGap: { min: 1, max: 3.375 },

    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '& span:first-of-type': {
        fluidFontSize: { min: fontSizes.sm, max: fontSizes.rg },
      },

      '& span:last-of-type': {
        fluidFontSize: { min: fontSizes.rg, max: fontSizes.md },
      },

      '& strong:first-of-type': {
        fluidFontSize: { min: fontSizes.rg, max: fontSizes.md },
      },

      '& strong:last-of-type': {
        fluidFontSize: { min: fontSizes.lg, max: fontSizes.xl },
      },
    },
  },
})

/* 
  Component
*/
interface CartDrawerProps {
  open: boolean
  toggleOpen: (open: boolean) => void
}

export function CartDrawer({ open, toggleOpen }: CartDrawerProps) {
  return (
    <S_SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => toggleOpen(false)}
      onOpen={() => toggleOpen(true)}
    >
      <header>
        <button onClick={() => toggleOpen(false)}>
          <X size={24} weight="bold" />
        </button>
      </header>
      <main>
        <h2>Shopping Bag</h2>
        <ul>
          <li>
            <CartDrawerItem
              imgUrl={Shirt01.src}
              name="Beyond the Summit"
              price="$69.69"
            />
          </li>
          <li>
            <CartDrawerItem
              imgUrl={Shirt02.src}
              name="Large Name of Disgrace"
              price="$59.69"
            />
          </li>
          <li>
            <CartDrawerItem
              imgUrl={Shirt03.src}
              name="Yet Another Large Name of Disgrace"
              price="$79.69"
            />
          </li>
        </ul>
      </main>
      <footer>
        <section>
          <div>
            <span>Quantity</span>
            <span>3 items</span>
          </div>
          <div>
            <strong>Total amount</strong>
            <strong>$123.50</strong>
          </div>
        </section>
        <BrandButton>Checkout</BrandButton>
      </footer>
    </S_SwipeableDrawer>
  )
}
