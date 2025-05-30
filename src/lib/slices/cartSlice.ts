import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICartProduct } from "../../interfaces/product";
import axios from "axios";
import type { ProductCart } from "../../interfaces/productCart";
import { toast } from "react-toastify";

const token = "Bearer " + localStorage.getItem("Token");

export const addTOCartAction = createAsyncThunk(
  "cart/add",
  async (productId: string) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cart/add`,
      { productId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.data;
  }
);
export const deleteFromCartAction = createAsyncThunk(
  "cart/delete",
  async (productId: string) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`,
      {
        headers: {
          Authorization: token,
        },
        data: { productId },
      }
    );
    return res.data;
  }
);
export const getProductsCart = createAsyncThunk("cart/get", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
    headers: {
      Authorization: token,
    },
  });

  return res.data.cart;
});
export const clearCartAction = createAsyncThunk("cart/clear", async () => {
  const res = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/cart/clear`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
});
export const UpdateCartAction = createAsyncThunk(
  "cart/add",
  async (productId: string) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cart/add`,
      { productId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res.data;
  }
);

interface CartState {
  itemsCart: ProductCart[];
  productsCart: ICartProduct[] | null;
  addLoading: boolean;
  removeLoading: boolean;
  getLoading: boolean;
  clearLoading: boolean;
  errorInAdd: string | null;
  errorInRemove: string | null;
  errorInGet: string | null;
  currentID: string;
}

const initialState: CartState = {
  productsCart: null,
  itemsCart: [],
  addLoading: false,
  removeLoading: false,
  getLoading: false,
  errorInAdd: null,
  errorInRemove: null,
  errorInGet: null,
  clearLoading: false,
  currentID: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsCart.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getProductsCart.fulfilled, (state, action) => {
        state.getLoading = false;
        state.productsCart = action.payload.products;

        state.errorInGet = null;
      })
      .addCase(getProductsCart.rejected, (state) => {
        state.getLoading = false;
        state.productsCart = [];
      })
      .addCase(addTOCartAction.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addTOCartAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.itemsCart?.push(action.payload);
          toast.success(action.payload.message);
          state.addLoading = false;
        }
      })

      .addCase(addTOCartAction.rejected, (state, action) => {
        if (action.payload == undefined) {
          state.addLoading = false;
          toast.error("Product already in cart");
        }
      })
      .addCase(deleteFromCartAction.pending, (state) => {
        state.removeLoading = true;
      })
      .addCase(deleteFromCartAction.fulfilled, (state, action) => {
        state.itemsCart?.push(action.payload);
        if (action.payload.cart.products.length == 0) {
          state.productsCart = [];
        }
        state.removeLoading = false;
      })

      .addCase(deleteFromCartAction.rejected, (state) => {
        state.removeLoading = false;
      })

      .addCase(clearCartAction.pending, (state) => {
        state.clearLoading = true;
      })
      .addCase(clearCartAction.fulfilled, (state) => {
        state.clearLoading = false;
        state.productsCart = [];
      })
      .addCase(clearCartAction.rejected, (state) => {
        state.clearLoading = false;
      });
  },
});

export const cartReducer = cartSlice.reducer;
