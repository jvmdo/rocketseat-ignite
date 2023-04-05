import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { styled, config } from '@/styles/stitches.config'
import { X } from 'phosphor-react'
import { BrandButton } from '@/components/BrandButton'
import { CartDrawerItem } from './CartDrawerItem'
import { useShoppingCart } from 'use-shopping-cart'
import imagePlaceholder from 'public/placeholder.png'
import { useState } from 'react'
import axios from 'axios'

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

      '& > span': {
        color: '$gray300',
        fluidFontSize: { min: fontSizes.xs, max: fontSizes.sm },
      },
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
  // TODO: check if it's possible to use shouldDisplayCart
  toggleOpen: (open: boolean) => void
}

export function CartDrawer({ open, toggleOpen }: CartDrawerProps) {
  const { cartDetails, cartCount, formattedTotalPrice } = useShoppingCart()
  const products = Object.values(cartDetails ?? {})

  const [isProcessingCheckout, setProcessingCheckout] = useState(false)

  async function handleCheckoutClick() {
    try {
      setProcessingCheckout(true)
      console.log(products)
      const response = await axios.post('/api/checkout', {
        cartDetails: JSON.stringify(products),
      })
      const checkoutUrl = response.data.url
      window.location.href = checkoutUrl
    } catch (err) {
      setProcessingCheckout(false)
      console.log('[Product/handleCheckoutClick]: ', err)
    }
  }

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
        <h2>
          Shopping Bag <span>{!cartCount ? '(empty)' : ''}</span>
        </h2>
        <ul>
          {products.map(({ id, image, name, price }) => {
            const imgUrl = image ?? imagePlaceholder.src
            return (
              <li key={id}>
                <CartDrawerItem {...{ id, imgUrl, name, price }} />
              </li>
            )
          })}
        </ul>
      </main>
      <footer>
        <section>
          <div>
            <span>Quantity</span>
            <span>{cartCount} items</span>
          </div>
          <div>
            <strong>Total amount</strong>
            <strong>{formattedTotalPrice}</strong>
          </div>
        </section>
        <BrandButton
          disabled={!cartCount || isProcessingCheckout}
          onClick={handleCheckoutClick}
        >
          Checkout
        </BrandButton>
      </footer>
    </S_SwipeableDrawer>
  )
}
