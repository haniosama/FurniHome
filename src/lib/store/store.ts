import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slices/products";
import { cartReducer } from "../slices/cartSlice";
import AuthSlice from "../slices/auth";
export const store = configureStore({
  reducer: {
    fetchProduct: ProductReducer,
    cartReducer,
    auth: AuthSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
