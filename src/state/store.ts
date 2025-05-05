import {configureStore} from "@reduxjs/toolkit";
import {jobsApi} from "./api/jobsApi.ts";
import {authApi} from "./api/authApi.ts";
import authReducer from "./auth/authSlice.ts";
import modalReducer from "./modal/modalSlice.ts";
import searchReducer from "./search/searchSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    search: searchReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;