import {configureStore} from "@reduxjs/toolkit";
import jobReducer from "./job/jobSlice.ts";
import modalReducer from "./modal/modalSlice.ts";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    modal: modalReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;