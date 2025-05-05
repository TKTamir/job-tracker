import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "./baseQuery.ts";
import {AuthResponse, LoginCredentials, RegisterCredentials, User} from "../types/auth.ts";
import {decodeTokenToUser, handleAuthQuery} from "../../utils/auth/authHelpers.ts";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: AuthResponse): User => decodeTokenToUser(response.token),
      onQueryStarted: async (_, {queryFulfilled}) => {
        await handleAuthQuery(queryFulfilled);
      },
    }),

    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        url: '/users/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: AuthResponse): User => decodeTokenToUser(response.token),
      onQueryStarted: async (_, {queryFulfilled}) => {
        await handleAuthQuery(queryFulfilled);
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;
