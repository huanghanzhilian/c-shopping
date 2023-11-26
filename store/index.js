import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "./slices/fetchApiSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});
