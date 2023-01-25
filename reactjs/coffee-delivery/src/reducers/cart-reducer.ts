/* eslint-disable no-unused-vars */

import produce from 'immer'

export type CartItem = {
  image: string
  name: string
  price: number
  quantity: number
}

export enum ActionTypes {
  INSERT = 'INSERT',
  REMOVE = 'REMOVE',
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  CLEAR = 'CLEAR',
}

interface DispatchActions {
  type: ActionTypes
  payload?: { item: CartItem }
}

interface CartState {
  cart: CartItem[]
}

export function cartReducer(state: CartState, action: DispatchActions) {
  const emptyItem: CartItem = { name: '', image: '', price: 0, quantity: 0 }
  const payload = action.payload?.item ?? emptyItem
  const itemIndex = state.cart.findIndex(({ name }) => name === payload.name)

  switch (action.type) {
    case ActionTypes.INSERT:
      return !~itemIndex
        ? produce(state, (draft) => {
            draft.cart.push(payload)
          })
        : produce(state, (draft) => {
            draft.cart[itemIndex].quantity += payload.quantity
          })

    case ActionTypes.REMOVE:
      return produce(state, (draft) => {
        draft.cart.splice(itemIndex, 1)
      })

    case ActionTypes.INCREASE:
      return !~itemIndex
        ? state
        : produce(state, (draft) => {
            draft.cart[itemIndex].quantity += 1
          })

    case ActionTypes.DECREASE:
      return !~itemIndex
        ? state
        : produce(state, (draft) => {
            draft.cart[itemIndex].quantity -= 1
          })

    case ActionTypes.CLEAR: {
      return produce(state, (draft) => {
        draft.cart.splice(0, Infinity)
      })
    }

    default:
      return state
  }
}
