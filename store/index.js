import { configureStore } from '@reduxjs/toolkit'

//? Reducers
import userReducer from './slices/user.slice'
import alertReducer from './slices/alert.slice'
import apiSlice from './services/api'

//? Actions
export * from './slices/user.slice'
export * from './slices/alert.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
