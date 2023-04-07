import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { styled, config } from '@/styles/stitches.config'
import { X } from 'phosphor-react'
import { BrandButton } from '@/components/BrandButton'
import { CartDrawerItem } from './CartDrawerItem'
import imagePlaceholder from 'public/placeholder.png'
import { useState } from 'react'
import axios from 'axios'
import { formatCurrency, useCart } from '@/hooks/useCart'

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
export function CartDrawer() {
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false)
  const { cart, cartCount, totalPrice, handleCartClick, shouldDisplayCart } =
    useCart()

  async function handleCheckoutClick() {
    try {
      setIsProcessingCheckout(true)
      const response = await axios.post('/api/checkout', {
        cart: JSON.stringify(cart),
      })
      const checkoutUrl = response.data.url
      window.location.href = checkoutUrl
    } catch (err) {
      setIsProcessingCheckout(false)
      console.log('[Product/handleCheckoutClick]: ', err)
    }
  }

  // ? An error is raised when [handleCartClick] is passed directly
  // ? as callback. That's why I am invoking it from another function
  return (
    <S_SwipeableDrawer
      anchor="right"
      open={shouldDisplayCart}
      onClose={() => handleCartClick()}
      onOpen={() => handleCartClick()}
    >
      <header>
        <button onClick={() => handleCartClick()}>
          <X size={24} weight="bold" />
        </button>
      </header>
      <main>
        <h2>
          Shopping Bag <span>{!cartCount ? '(empty)' : ''}</span>
        </h2>
        <ul>
          {cart.map(({ id, image, name, price, quantity }) => {
            const imgUrl = image ?? imagePlaceholder.src
            return (
              <li key={id}>
                <CartDrawerItem {...{ id, imgUrl, name, price, quantity }} />
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
            <strong>{formatCurrency(totalPrice ?? 0)}</strong>
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
