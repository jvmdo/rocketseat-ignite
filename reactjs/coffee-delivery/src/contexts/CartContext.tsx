import { createContext, ReactNode, useReducer } from 'react'
import { ActionTypes, CartItem, cartReducer } from '../reducers/cart-reducer'

interface CartContextProps {
  cart: CartItem[]
  insert: (item: CartItem) => void
  remove: (item: CartItem) => void
  increase: (item: CartItem) => void
  decrease: (item: CartItem) => void
  clear: () => void
}

export const CartContext = createContext({} as CartContextProps)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] })

  const { cart } = cartState

  function insert(item: CartItem) {
    dispatch({ type: ActionTypes.INSERT, payload: { item } })
  }

  function remove(item: CartItem) {
    dispatch({ type: ActionTypes.REMOVE, payload: { item } })
  }

  function increase(item: CartItem) {
    dispatch({ type: ActionTypes.INCREASE, payload: { item } })
  }

  function decrease(item: CartItem) {
    dispatch({ type: ActionTypes.DECREASE, payload: { item } })
  }

  function clear() {
    dispatch({ type: ActionTypes.CLEAR })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        insert,
        remove,
        increase,
        decrease,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
