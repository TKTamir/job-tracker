import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface LoginData {
  email: string;
  password: string;
}

export type CustomFetchError = FetchBaseQueryError & {
  data: { message: string };
};