import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phonebookApi = createApi({
  reducerPath: 'phonebookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://639b69d7d51415019754c230.mockapi.io',
  }),
  tagTypes: ['Phone'],
  endpoints: builder => ({
    getFetchPhonebook: builder.query({
      query: () => `contacts`,
      providesTags: ['Phone'],
    }),
    getCreateContact: builder.mutation({
      query: body => ({
        url: `contacts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: isSuccess => (isSuccess ? ['Phone'] : []),
    }),
    getDeleteContact: builder.mutation({
      query: phonebookId => ({
        url: `contacts/${phonebookId}`,
        method: 'DELETE',
      }),

      invalidatesTags: isSuccess => (isSuccess ? ['Phone'] : []),
    }),
  }),
});
export const {
  useGetFetchPhonebookQuery,
  useGetDeleteContactMutation,
  useGetCreateContactMutation,
} = phonebookApi;
