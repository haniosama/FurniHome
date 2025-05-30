import Cookie from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Iproduct } from "../../interfaces/product";
import type { IOrder } from "../../interfaces/orderDashboard";
import type { IUserInfo } from "../../interfaces/userInfoDashboard";
const baseUrl: string = import.meta.env.VITE_API_URL as string;
const token = Cookie.get("token") as string;
console.log(token, "kkkkkkkkkkkkkkkkkk");

export const getProdectForAdmin = createAsyncThunk(
  "Admin_Producs/getProduct",
  async () => {
    try {
      const data = await (
        await fetch(`${baseUrl}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      console.log(data, "for admin");
      return data.products;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getCustomerForAdmin = createAsyncThunk(
  "Admin_Producs/getCustomer",
  async (adminId: string) => {
    try {
      const data = await (
        await fetch(`${baseUrl}/api/customer/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      return data.customers;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getOrdersForAdmin = createAsyncThunk(
  "Admin_Producs/getOrder",
  async (adminId: string) => {
    try {
      const data = await (
        await fetch(`${baseUrl}/api/order/admin/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      console.log(data.orders);
      return data.orders;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUserInformayionForUser = createAsyncThunk(
  "Admin_Producs/getUserInformation",
  async (userId: string) => {
    try {
      const data = await (
        await fetch(`${baseUrl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const dashboardAdmim = createSlice({
  name: "Admin_Producs",
  initialState: {
    products: [] as Iproduct[],
    orders: [] as IOrder[],
    usersInfo: [] as IUserInfo[],
    customers: [] as [],
    isLoading: false as boolean,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProdectForAdmin.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProdectForAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProdectForAdmin.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });

    builder.addCase(getCustomerForAdmin.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCustomerForAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCustomerForAdmin.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });

    builder.addCase(getOrdersForAdmin.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOrdersForAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersForAdmin.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });

    builder.addCase(getUserInformayionForUser.fulfilled, (state, action) => {
      state.usersInfo.push(...action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(getUserInformayionForUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserInformayionForUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const admimSlice = dashboardAdmim.reducer;
