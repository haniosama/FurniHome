import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IChangePassword, ILogin, IRegister } from "../../interfaces/Auth";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

// ✅ Signup
export const signup = createAsyncThunk(
  "Auth/signup",
  async function (userInfo: IRegister, { rejectWithValue }) {
    try {
      const formData = new FormData();
      formData.append("username", userInfo.username);
      formData.append("email", userInfo.email);
      formData.append("phone", userInfo.phone);
      formData.append("password", userInfo.password);
      formData.append("role", userInfo.role);

      if (userInfo.avatar) {
        formData.append("avatar", userInfo.avatar);
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// ✅ Signin
export const signin = createAsyncThunk(
  "Auth/signin",
  async function (userInfo: ILogin, { rejectWithValue }) {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        userInfo
      );
      return data;
    } catch (error: any) {
      return rejectWithValue("Email Or Password Is Invalid");
    }
  }
);

// ✅ Email Verification
export const emailVerification = createAsyncThunk(
  "Auth/emailVerification",
  async function (values: IChangePassword, { rejectWithValue }) {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/forget-password`,
        { email: values.email }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue("Email Is Invalid");
    }
  }
);

// ✅ Change Password
export const changePassword = createAsyncThunk(
  "Auth/changePassword",
  async function (values: IChangePassword, { rejectWithValue }) {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/forget-password-verification`,
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

// ✅ Slice
const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    loginToken: localStorage.getItem("Token") || null,
    userId: localStorage.getItem("UserId") || null,
    registerLoading: false,
    loginLoading: false,
    verifyCodeLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.registerLoading = false;
      toast.error(typeof action.payload === "string" ? action.payload : "Register failed");
    });

    // Signin
    builder.addCase(signin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginToken = action.payload.token;

      try {
        const decoded: any = jwtDecode(action.payload.token);
        const extractedUserId = decoded.userID;
        state.userId = extractedUserId;
        localStorage.setItem("Token", action.payload.token);
        localStorage.setItem("UserId", extractedUserId);
      } catch {
        state.userId = null;
        toast.error("Failed to decode token");
      }
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loginLoading = false;
      toast.error(typeof action.payload === "string" ? action.payload : "Login failed");
    });

    // Email Verification
    builder.addCase(emailVerification.pending, (state) => {
      state.verifyCodeLoading = true;
    });
    builder.addCase(emailVerification.fulfilled, (state) => {
      state.verifyCodeLoading = false;
    });
    builder.addCase(emailVerification.rejected, (state, action) => {
      state.verifyCodeLoading = false;
      toast.error(typeof action.payload === "string" ? action.payload : "Email Is Invalid");
    });

    // Change Password
    builder.addCase(changePassword.pending, (state) => {
      state.verifyCodeLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.verifyCodeLoading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.verifyCodeLoading = false;
      toast.error(typeof action.payload === "string" ? action.payload : "Invalid code or password");
    });
  },
});

export default AuthSlice.reducer;
