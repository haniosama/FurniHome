import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type IProducts from '../../interfaces/product';

const API_URL = import.meta.env.VITE_API_URL;

// getToken from localStorage
function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem("Token");
}

// Get Auth Header
const getAuthHeader = () => {
  const token = getTokenFromLocalStorage();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

interface WishlistState {
  items: IProducts[];
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  ids: [],
  loading: false,
  error: null,
};

// Wishlist
export const fetchWishlist = createAsyncThunk<IProducts[]>(
  'wishlist/fetchWishlist',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/wishlist`, getAuthHeader());
      return response.data.wishlist;
    } catch (error: unknown) {
      let message = "An error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add productToWishlist
export const addToWishlist = createAsyncThunk<string[], string>(
  'wishlist/addToWishlist',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/wishlist/${productId}`, null, getAuthHeader());
      return response.data.wishlist;
    } catch (error: unknown) {
      let message = "An error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove product from Wishlist
export const removeFromWishlist = createAsyncThunk<string[], string>(
  'wishlist/removeFromWishlist',
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/api/wishlist/${productId}`, getAuthHeader());
      return response.data.wishlist;
    } catch (error: unknown) {
      let message = "An error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<IProducts[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.ids = action.payload.map((product) => product._id);
      })
      .addCase(fetchWishlist.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      })
      .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload;
        state.items = state.items.filter(item => action.payload.includes(item._id));
      })
      .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload;
        state.items = state.items.filter(item => action.payload.includes(item._id));
      })
        },
      });

export default wishlistSlice.reducer;
