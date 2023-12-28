import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const getLastSeen = () => {
  if (typeof window !== 'undefined') {
    const lastSeenJSON = localStorage.getItem('lastSeen')
    if (lastSeenJSON) return JSON.parse(lastSeenJSON)
  }

  return []
}

const token = Cookies.get('token') || ''

const initialState = { token, lastSeen: getLastSeen() }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: state => {
      Cookies.remove('token')
      state.token = ''
    },

    userLogin: (state, action) => {
      Cookies.set('token', action.payload, { expires: 10 })
      state.token = action.payload
    },
    addToLastSeen: (state, action) => {
      let isItemExist = state.lastSeen.find(item => item.productID === action.payload.productID)

      if (!isItemExist) {
        if (state.lastSeen.length === 15) {
          state.lastSeen.splice(14, 1)
        }
        state.lastSeen.unshift(action.payload)
        localStorage.setItem('lastSeen', JSON.stringify(state.lastSeen))
      }
    },
  },
})

export const { userLogout, userLogin, addToLastSeen } = userSlice.actions

export default userSlice.reducer
