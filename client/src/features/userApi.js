import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/${id}`,
    }),
    getAllUsers: builder.query({
      query: () => `/`,
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/",
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
    }),
    //follow
    followUser: builder.mutation({
      query: (id) => ({
        url: `/${id}/follow`,
        method: 'POST',
      }),
    }),
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `/${id}/unfollow`,
        method: 'POST',
      }),
    }),
    getFollowing: builder.query({
      query: (id) => `/${id}/following`,
    }),
    getFollowers: builder.query({
      query: (id) => `/${id}/followers`,
    }),
    //block
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/${id}/block`,
        method: 'POST',
      }),
    }),
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/${id}/unblock`,
        method: 'POST',
      }),
    }),
    getBlocked: builder.query({
      query: (id) => `/${id}/blocked`,
    }),

  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetBlockedQuery,
} = userApi;