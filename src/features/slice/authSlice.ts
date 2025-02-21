import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthForm, AuthState, User } from "../../types";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<User, AuthForm>(
  "auth/login",
  async (credentials: AuthForm, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", credentials);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return rejectWithValue(axiosError.response?.data?.error);
    }
  }
);

export const register = createAsyncThunk<User, AuthForm>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/register", credentials);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return rejectWithValue(axiosError.response?.data?.error);
    }
  }
);

export const getUser = createAsyncThunk<User, void>(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/users/2");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return rejectWithValue(axiosError.response?.data?.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; 
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; 
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
