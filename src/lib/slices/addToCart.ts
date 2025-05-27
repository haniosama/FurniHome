import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";
const token = Cookie.get("token");

// Define the async thunk for fetching products
export const AddToCart = createAsyncThunk(
  "product/AddToCart",
  async (productId: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cart/add`,
      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    data: [],
    loadings: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddToCart.pending, (state) => {
      state.loadings = true;
    });
    builder.addCase(AddToCart.fulfilled, (state, action) => {
      state.loadings = false;
      state.data = action.payload.products;
    });
    builder.addCase(AddToCart.rejected, (state, action) => {
      state.loadings = false;
      state.error = action.error.message || null;
    });
  },
});
export default addToCartSlice.reducer;
