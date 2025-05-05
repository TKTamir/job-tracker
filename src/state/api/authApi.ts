import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "./baseQuery.ts";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}


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
    }),
    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        url: '/users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => 'auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = authApi;
