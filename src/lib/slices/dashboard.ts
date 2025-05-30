import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Cookie from "js-cookie";
// import { jwtDecode } from "jwt-decode";
import type { Iproduct } from "../../interfaces/product";
const baseUrl: string = import.meta.env.VITE_API_URL as string;
// const token = Cookie.get("userToken") as string;
// let user: { userID: string } | null = null;
// if (token) {
//     try {
//         user = jwtDecode<{ userID: string }>(token);
//         console.log(user, "user");
//     } catch (error) {
//         console.error("Invalid token:", error);
//     }
//     } else {
//         console.warn("No user token found in cookies");
//     }

export const getProdectForAdmin = createAsyncThunk(
  "Admin_Producs/getProduct",
  async () => {
    try {
      const data = await (
        await fetch(`${baseUrl}/api/dashboard`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik1vaGFtZWQgU2FsYWgiLCJ1c2VySUQiOiI2ODI5OGExMGIwMTA4Y2U2ODRkYWMxYTMiLCJlbWFpbCI6Im00ODE2MjY5OEBnbWFpbC5jb20iLCJ2ZXJpZmllZCI6dHJ1ZSwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vcHJvamVjdHMtaXRpL2ltYWdlL3VwbG9hZC92MTc0ODIyODkxNC9hdmF0YXJzL3p3a2UxYnZ5ZTJqMW1rZWFwcW1wLnBuZyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODQ5OTY0NX0.tUQ1H-4Wc6wYLdTaHSLU9UER-N25VWLCA2rAhntMFJw`,
          },
        })
      ).json();
      console.log(data.products, "for admin");
      return data.products;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getCustomerForAdmin = createAsyncThunk(
  "Admin_Producs/getCustomer",
  async () => {
    const data = await (
      await fetch(`${baseUrl}/api/customer/${user?.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
    return data.customers;
  }
);

const productForAdmin = createSlice({
  name: "Admin_Producs",
  initialState: {
    products: [] as Iproduct[],
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
  },
});

export const productForAdminSlice = productForAdmin.reducer;
