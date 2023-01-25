import { createContext, ReactNode, useState } from 'react'

type CartItem = {
  image: string
  name: string
  price: number
  quantity: number
}

interface CartContextProps {
  items: CartItem[]
  insert: (item: CartItem) => void
  remove: (itemName: string) => void
  addQuantity: (index: number, value?: number) => void
  clear: () => void
}

export const CartContext = createContext({} as CartContextProps)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  function insert(newItem: CartItem) {
    setCart((state) => {
      const item = state.find(({ name }) => name === newItem.name)
      if (!item) return [...state, newItem]

      const newState = state.filter(({ name }) => name !== newItem.name)
      return [
        ...newState,
        { ...newItem, quantity: newItem.quantity + item.quantity },
      ]
    })
  }

  function remove(itemName: string) {
    setCart((state) => state.filter(({ name }) => name !== itemName))
  }

  function addQuantity(index: number, value = 1) {
    setCart((state) => {
      if (!state[index]) return state

      const newState = [...state]
      newState[index] = {
        ...newState[index],
        quantity: newState[index].quantity + value,
      }
      return newState
    })
  }

  function clear() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ items: cart, insert, remove, addQuantity, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}
