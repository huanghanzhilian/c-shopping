import { configureStore } from '@reduxjs/toolkit'

//? Reducers
import userReducer from './slices/user.slice'
import apiSlice from './services/api'

//? Actions
export * from './slices/user.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
