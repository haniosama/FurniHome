import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../slices/cartSlice";

import AuthSlice from "../slices/auth";
import { productForAdminSlice } from "../slices/dashboard";

export const store = configureStore({
  reducer: {

    cartReducer,

    auth: AuthSlice,
    dashBoard:productForAdminSlice

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
