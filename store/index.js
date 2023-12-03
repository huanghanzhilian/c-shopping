import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "./slices/fetchApiSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});
