import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExist = state.cartItems.find(item => item._id === action.payload._id)

      if (itemExist) {
        itemExist.quantity += 1
        Cookies.set('cartItems', JSON.stringify(state.cart))
      } else {
        state.cartItems.push(action.payload)
        Cookies.set('cartItems', JSON.stringify(state.cart))
      }
    },

    removeFromCart: (state, action) => {
      const index = state.cartItems.find(item => item._id === action.payload._id)

      if (index !== -1) {
        state.cartItems.splice(index, 1)
        Cookies.set('cartItems', JSON.stringify(state.cart))
      }
    },

    increase: (state, action) => {
      state.cartItems.forEach(item => {
        if (item._id === action.payload._id) item.quantity += 1
      })
    },

    decrease: (state, action) => {
      state.cartItems.forEach(item => {
        if (item._id === action.payload._id) item.quantity -= 1
      })
    },

    clearCart: (state, action) => {
      state.cartItems = []
      Cookies.remove('cartItems')
    },
  },
})

export const { addToCart, removeFromCart, clearCart, decrease, increase } = cartSlice.actions

export default cartSlice.reducer
