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
      providesTags: (result, error, id) => [{ type: 'Thread', id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Thread', id }],
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
      invalidatesTags: (result, error, id) => [{ type: 'Thread', id }],
    }),
    unlikeThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Thread', id }],
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
      providesTags: (result, error, id) => [{ type: 'Post', id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
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
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/unlike`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
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

  useGetPostsForThreadQuery,
  useGetUserPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = forumApi;
