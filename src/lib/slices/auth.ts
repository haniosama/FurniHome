import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IChangePassword, ILogin, IRegister } from "../../interfaces/Auth";
import toast from "react-hot-toast";

export const signup = createAsyncThunk(
  "Auth/signup",
  async function (userInfo: IRegister, { rejectWithValue }) {
    try {
      const { data } = await axios.post(
        `https://nodejs-e-commerce-production.up.railway.app/api/auth/signup`,
        userInfo
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const signin = createAsyncThunk(
  "Auth/signin",
  async function (userInfo: ILogin, { rejectWithValue }) {
    try {
      const { data } = await axios.post(
         `https://nodejs-e-commerce-production.up.railway.app/api/auth/signin`,
        userInfo
      );
      return data;
    } catch (error: any) {
      return rejectWithValue("Email Or Password Is Invalid");
    }
  }
);

export const emailVerification = createAsyncThunk(
  "Auth/emailVerification",
  async function (values: IChangePassword, { rejectWithValue }) {
    try {
      const { data } = await axios.patch(
        `https://nodejs-e-commerce-production.up.railway.app/api/auth/forget-password`,
        { email: values.email }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue("Email Is Invalid");
    }
  }
);

export const changePassword = createAsyncThunk(
  "Auth/changePassword",
  async function (values: IChangePassword, { rejectWithValue }) {
    try {
      const { data } = await axios.patch(
         `https://nodejs-e-commerce-production.up.railway.app/api/auth/forget-password-verification`,
        {
          providedCode: values.providedCode,
          newPassword: values.newPassword,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue("Invalid code or password");
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    loginToken: localStorage.getItem("Token") || null,
    registerLoading: false,
    loginLoading: false,
    verifyCodeLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //#region signup
    builder.addCase(signup.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.registerLoading = false;

      if (typeof action.payload === "string") {
        toast.error(action.payload);
      } else {
        toast.error("Register failed");
      }
    });
    //#endregion

    //#region signIn
    builder.addCase(signin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginToken = action.payload.token;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loginLoading = false;

      if (typeof action.payload === "string") {
        toast.error(action.payload);
      } else {
        toast.error("Login failed");
      }
    });
    //#endregion

    //#region emailVerification
    builder.addCase(emailVerification.pending, (state) => {
      state.verifyCodeLoading = true;
    });
    builder.addCase(emailVerification.fulfilled, (state) => {
      state.verifyCodeLoading = false;
    });
    builder.addCase(emailVerification.rejected, (state, action) => {
      state.verifyCodeLoading = false;

      if (typeof action.payload === "string") {
        toast.error(action.payload);
      } else {
        toast.error("Email Is Invalid");
      }
    });
    //#endregion

    //#region changePassword
    builder.addCase(changePassword.pending, (state) => {
      state.verifyCodeLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.verifyCodeLoading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.verifyCodeLoading = false;

      if (typeof action.payload === "string") {
        toast.error(action.payload);
      } else {
        toast.error("Invalid code or password");
      }
    });
    //#endregion
  },
});

export default AuthSlice.reducer;
