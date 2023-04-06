import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

type Item = {
  id: string
  name: string
  imgUrl: string
  price: number
  priceId: string
}

export function useCart() {
  const methods = useShoppingCart()
  const { cartDetails, addItem, removeItem, currency: _currency } = methods

  const currency = _currency ?? 'USD'
  const _cart = new Map(Object.entries(cartDetails ?? {}))
  const cart = Array.from(_cart.values())

  function getItem(id: string) {
    return _cart.get(id)
  }

  function toggleItem({ id, name, imgUrl, price, priceId }: Item) {
    const isInCart = getItem(id)
    if (isInCart) {
      removeItem(id)
    } else {
      // eslint-disable-next-line camelcase
      addItem({ id, name, price, currency, image: imgUrl, price_id: priceId })
    }
  }

  return { cart, getItem, toggleItem, currency, ...methods }
}

export const formatCurrency = (price: number) =>
  formatCurrencyString({
    value: price,
    currency: 'USD',
    language: 'en-US',
  })
