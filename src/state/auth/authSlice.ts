import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginUserAPI, logoutUserAPI, registerUserAPI} from "../../services/api.ts";
import {UserData} from "../../components/Register/Interfaces.ts";
import {LoginData} from "../../components/Login/Interfaces.ts";

interface User {
  id: number;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserData, {rejectWithValue}) => {
    try {
      return await registerUserAPI(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log('Unknown error: ', error);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: LoginData, {rejectWithValue}) => {
    try {
      return await loginUserAPI(loginData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log('Unknown error: ', error);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      logoutUserAPI();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "idle";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as unknown as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "idle";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as unknown as string;
      })
  }
});

export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;