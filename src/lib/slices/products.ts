import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookie from "js-cookie";

// const token = Cookie.get("token");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2ODI3OTkxZDkxNGU3NzlkNzI5NDNhZmEiLCJlbWFpbCI6ImV6emF0eW91c3NlZkBnbWFpbC5jb20iLCJ2ZXJpZmllZCI6ZmFsc2UsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ3NDMyMDM3fQ.diNj3N8WuUiiynHuAh49WPd0NdKT2j4_J6UDVe-kJgY";
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});
export default productSlice.reducer;
