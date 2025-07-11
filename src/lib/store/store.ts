import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slices/products";
import { cartReducer } from "../slices/cartSlice";
import AuthSlice from "../slices/auth";
import { admimSlice } from "../slices/dashboard";
import wishlistReducer from "../slices/wishlistSlice";
import ProductDetailsReducer from "../slices/productDetials";

export const store = configureStore({
  reducer: {
    fetchProduct: ProductReducer,
    cartReducer,
    auth: AuthSlice,
    dashBoard: admimSlice,
    wishlist: wishlistReducer,
    productDetails: ProductReducer,
    productById: ProductDetailsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
