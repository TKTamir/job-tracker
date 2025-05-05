import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    console.log('Prepared headers:', Object.fromEntries(headers.entries()));

    return headers;
  },
});