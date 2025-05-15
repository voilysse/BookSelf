// src/redux/api/shelfApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shelfApi = createApi({
  reducerPath: "shelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/shelves",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserShelves: builder.query({
      query: (userId) => `/${userId}/user`,
    }),
    getShelf: builder.query({
      query: (shelfId) => `/${shelfId}`,
    }),
    createShelf: builder.mutation({
      query: (shelfData) => ({
        url: `/create`,
        method: "POST",
        body: shelfData,
      }),
    }),
    updateShelf: builder.mutation({
      query: ({ shelfId, ...updates }) => ({
        url: `/${shelfId}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteShelf: builder.mutation({
      query: (shelfId) => ({
        url: `/${shelfId}`,
        method: "DELETE",
      }),
    }),
    addBookToShelf: builder.mutation({
      query: ({ shelfId, bookId }) => ({
        url: `/${shelfId}/add`,
        method: "POST",
        body: { bookId },
      }),
    }),
    removeBookFromShelf: builder.mutation({
      query: ({ shelfId, bookId }) => ({
        url: `/${shelfId}/remove`,
        method: "POST",
        body: { bookId },
      }),
    }),
  }),
});

export const {
  useGetUserShelvesQuery,
  useGetShelfQuery,
  useCreateShelfMutation,
  useUpdateShelfMutation,
  useDeleteShelfMutation,
  useAddBookToShelfMutation,
  useRemoveBookFromShelfMutation,
} = shelfApi;
