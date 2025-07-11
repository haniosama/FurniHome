import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Iproduct } from "../../interfaces/product";

// import Cookie from "js-cookie";

// const token = Cookie.get("token");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2ODI3OTkxZDkxNGU3NzlkNzI5NDNhZmEiLCJlbWFpbCI6ImV6emF0eW91c3NlZkBnbWFpbC5jb20iLCJ2ZXJpZmllZCI6ZmFsc2UsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ3NDMyMDM3fQ.diNj3N8WuUiiynHuAh49WPd0NdKT2j4_J6UDVe-kJgY";
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    error: null as string | null,
    loading: false,
    specificProduct: {} as Iproduct,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.specificProduct = action.payload.product[0];
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export default productDetailsSlice.reducer;
