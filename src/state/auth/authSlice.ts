import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from '../api/authApi';
import {decodeTokenToUser} from "../../utils/auth/authHelpers.ts";
import {RootState} from "../store.ts";
import {AuthState, User} from "../types/auth.ts";

const token = localStorage.getItem('token');

let user: User | null = null;

const initialState: AuthState = {
  user,
  token,
};

if (token) {
  try {
    user = decodeTokenToUser(token);
  } catch (error) {
    console.error("Invalid token in localStorage", error);
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
    setUserFromToken: (state, action: PayloadAction<string>) => {
      try {
        const user = decodeTokenToUser(action.payload);
        state.user = user;
        state.token = user.token;
      } catch (error) {
        console.error('Failed to decode token in setUserFromToken', error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, {payload}: PayloadAction<User>) => {
          state.user = payload;
          state.token = payload.token;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, {payload}: PayloadAction<User>) => {
          state.user = payload;
          state.token = payload.token;
        }
      )
  },
});

export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;


export const {logout, setUserFromToken} = authSlice.actions;

export default authSlice.reducer;