import {configureStore} from "@reduxjs/toolkit";
import jobReducer from "./job/jobSlice.ts";
import modalReducer from "./modal/modalSlice.ts";
import searchReducer from "./search/searchSlice.ts";
import authReducer from "./auth/authSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    modal: modalReducer,
    search: searchReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;