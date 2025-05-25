import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../slices/cartSlice";

import AuthSlice from "../slices/auth";

export const store = configureStore({
  reducer: {

    cartReducer,

    auth: AuthSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
