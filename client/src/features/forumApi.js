// services/forumApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/forum',
    credentials: 'include', // sends cookies (HTTP-only auth)
  }),
  tagTypes: ['Thread', 'Post'],
  endpoints: (builder) => ({
    // THREADS
    getAllThreads: builder.query({
      query: () => '/threads',
      providesTags: ['Thread'],
    }),
    getUserThreads: builder.query({
      query: (userId) => `/threads/user/${userId}`,
      providesTags: ['Thread'],
    }),
    getThread: builder.query({
      query: (id) => `/threads/${id}`,
      providesTags: ['Thread'],
    }),
    createThread: builder.mutation({
      query: (data) => ({
        url: '/threads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Thread'],
    }),
    updateThread: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/threads/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Thread'],
    }),
    deleteThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Thread'],
    }),
    likeThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Thread'],
    }),
    unlikeThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: ['Thread'],
    }),
    dislikeThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}/dislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Thread'],
    }),
    undislikeThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}/undislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Thread'],
    }),

    // POSTS
    getPostsForThread: builder.query({
      query: (threadId) => `/threads/${threadId}/posts`,
      providesTags: ['Post'],
    }),
    getUserPosts: builder.query({
      query: (userId) => `/user/${userId}/posts`,
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: ({ threadId, text }) => ({
        url: `/threads/${threadId}/post`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, text }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: { text },
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    dislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    undislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/undislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetAllThreadsQuery,
  useGetUserThreadsQuery,
  useGetThreadQuery,
  useCreateThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useLikeThreadMutation,
  useUnlikeThreadMutation,
  useDislikeThreadMutation,
  useUndislikeThreadMutation,

  useGetPostsForThreadQuery,
  useGetUserPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useDislikePostMutation,
  useUndislikePostMutation,
} = forumApi;
