import { createSlice } from '@reduxjs/toolkit'

const initialState = { title: '', status: '', isShow: false }

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.isShow = true
      state.title = action.payload.title
      state.status = action.payload.status
    },
    removeAlert: state => {
      state.isShow = false
      state.status = ''
      state.title = ''
    },
  },
})

export const { showAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer
