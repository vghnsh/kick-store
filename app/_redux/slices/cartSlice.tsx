import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  quantity: number // Added quantity field
  rating: {
    rate: number
    count: number
  }
}

interface CartItem {
  item: Product
  quantity: number
}

export interface CartState {
  cart: CartItem[]
}

export const initialState: CartState = {
  cart: [],
}

const { reducer, actions } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { item, quantity } = action.payload
      const index = state.cart.findIndex((cart) => cart.item.id === item.id)
      if (index >= 0) {
        state.cart[index].quantity += quantity
      } else {
        state.cart.push({ item, quantity })
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(
        (cart) => cart.item.id === action.payload.id,
      )
      if (index >= 0) {
        if (state.cart[index].quantity < 2) {
          state.cart.splice(index, 1)
        } else {
          state.cart[index].quantity -= 1
        }
      }
    },

    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(
        (cart) => cart.item.id === action.payload.id,
      )
      if (index >= 0) {
        state.cart.splice(index, 1)
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const selectCartData = (state: { cart: CartState }) => state.cart.cart

export const { addToCart, removeFromCart, clearCart, removeProductFromCart } =
  actions
export default reducer
