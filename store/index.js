import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

//? Reducers
import userReducer from './slices/user.slice'
import alertReducer from './slices/alert.slice'
import filtersReducer from './slices/filters.slice'
import apiSlice from './services/api'

//? Actions
export * from './slices/user.slice'
export * from './slices/alert.slice'
export * from './slices/filters.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    filters: filtersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)
