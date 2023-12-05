import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const token = Cookies.get('token') || ''

const initialState = { token }

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
  },
})

export const { userLogout, userLogin } = userSlice.actions

export default userSlice.reducer
