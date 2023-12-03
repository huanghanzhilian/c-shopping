import { createSlice } from '@reduxjs/toolkit'

const token = window.localStorage.getItem('token') || ''
const userInfo = null

const initialState = { userInfo, token }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem('token')
      state.token = ''
    },

    userLogin: (state, action) => {
      localStorage.setItem('token', action.payload)
      state.token = action.payload
    },

    userInfo: (state, action) => {
      state.userInfo = action.payload
    }
  },
})

export const { userLogout, userLogin } = userSlice.actions

export default userSlice.reducer
