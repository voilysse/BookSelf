// features/api/bookApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/', // adjust if needed
    credentials: 'include',
  }),
  tagTypes: ['Book', 'Author', 'Review', 'Reply'],
  endpoints: (builder) => ({
    // ──────────────── BOOKS ────────────────
    getAllBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    createBook: builder.mutation({
      query: (body) => ({
        url: '/books/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    getBookAuthors: builder.query({
      query: (id) => `/books/${id}/authors`,
      providesTags: ['Author'],
    }),

    // ──────────────── AUTHORS ────────────────
    getAuthors: builder.query({
      query: () => '/authors',
      providesTags: ['Author'],
    }),
    getAuthor: builder.query({
      query: (id) => `/authors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Author', id }],
    }),
    createAuthor: builder.mutation({
      query: (body) => ({
        url: '/authors/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Author'],
    }),
    updateAuthor: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/authors/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Author', id }],
    }),
    deleteAuthor: builder.mutation({
      query: (id) => ({
        url: `/authors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Author'],
    }),
    getAuthorBooks: builder.query({
      query: (id) => `/authors/${id}/books`,
      providesTags: ['Book'],
    }),

    // ──────────────── REVIEWS ────────────────
    getBookReviews: builder.query({
      query: (bookId) => `/reviews/book/${bookId}`,
      providesTags: ['Review'],
    }),
    getUserReviews: builder.query({
      query: (userId) => `/reviews/user/${userId}`,
      providesTags: ['Review'],
    }),
    getReview: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: (result, error, id) => [{ type: 'Review', id }],
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: '/reviews',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review'],
    }),
    updateReview: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/reviews/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Review', id }],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
    likeReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Review'],
    }),
    unlikeReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: ['Review'],
    }),

    // ──────────────── REPLIES ────────────────
    getRepliesForReview: builder.query({
      query: (id) => `/reviews/${id}/replies`,
      providesTags: ['Reply'],
    }),
    getReply: builder.query({
      query: (id) => `/reviews/replies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Reply', id }],
    }),
    createReply: builder.mutation({
      query: ({ reviewId, text }) => ({
        url: `/reviews/replies/${reviewId}`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Reply'],
    }),
    updateReply: builder.mutation({
      query: ({ id, text }) => ({
        url: `/reviews/replies/${id}`,
        method: 'PUT',
        body: { text },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Reply', id }],
    }),
    deleteReply: builder.mutation({
      query: (id) => ({
        url: `/reviews/replies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reply'],
    }),
    likeReply: builder.mutation({
      query: (id) => ({
        url: `/reviews/replies/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Reply'],
    }),
    unlikeReply: builder.mutation({
      query: (id) => ({
        url: `/reviews/replies/${id}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: ['Reply'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookAuthorsQuery,

  useGetAuthorsQuery,
  useGetAuthorQuery,
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useGetAuthorBooksQuery,

  useGetBookReviewsQuery,
  useGetUserReviewsQuery,
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useLikeReviewMutation,
  useUnlikeReviewMutation,

  useGetRepliesForReviewQuery,
  useGetReplyQuery,
  useCreateReplyMutation,
  useUpdateReplyMutation,
  useDeleteReplyMutation,
  useLikeReplyMutation,
  useUnlikeReplyMutation,
} = bookApi;
