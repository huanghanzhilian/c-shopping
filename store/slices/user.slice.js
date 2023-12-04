import { createSlice } from '@reduxjs/toolkit'
import LocalStorage from '@/utils/localstorage'

const token = LocalStorage.getItem('token') || ''

const initialState = { token }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: state => {
      LocalStorage.removeItem('token')
      state.token = ''
    },

    userLogin: (state, action) => {
      LocalStorage.setItem('token', action.payload)
      state.token = action.payload
    },
  },
})

export const { userLogout, userLogin } = userSlice.actions

export default userSlice.reducer
