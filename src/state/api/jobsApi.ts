import {createApi} from '@reduxjs/toolkit/query/react';
import {IJobItem} from "../../components/JobItem/Interfaces.ts";
import {baseQuery} from "./baseQuery.ts";


export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: baseQuery,
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    getJobs: builder.query<IJobItem[], string | undefined>({
      query: (userId) => {
        const url = 'jobs';
        if (userId) {
          return `${url}?userId=${userId}`;
        }
        return url;
      },
      providesTags: ['Job'],
    }),
    addJob: builder.mutation<IJobItem, Partial<IJobItem>>({
      query: (job) => ({
        url: 'jobs',
        method: 'POST',
        body: job,
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation<IJobItem, Partial<IJobItem>>({
      query: (job) => ({
        url: `jobs/${job.id}`,
        method: 'PATCH',
        body: job,
      }),
      invalidatesTags: ['Job'],
    }),
    deleteJob: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;