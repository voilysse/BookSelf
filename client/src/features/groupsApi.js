import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/', // adjust if needed
    credentials: 'include',
  }),
  tagTypes: ['Group'],
  endpoints: (builder) => ({
    // Get all groups
    getAllGroups: builder.query({
      query: () => "/groups",
      providesTags: ["Group"],
    }),

    // Get single group by ID
    getGroupById: builder.query({
      query: (groupId) => `/groups/${groupId}`,
      providesTags: (result, error, id) => [{ type: "Group", id }],
    }),

    // Create new group
    createGroup: builder.mutation({
      query: (groupData) => ({
        url: "/groups/create",
        method: "POST",
        body: groupData,
      }),
      invalidatesTags: ["Group"],
    }),

    // Update a group
    updateGroup: builder.mutation({
      query: ({ groupId, ...updates }) => ({
        url: `/groups/${groupId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Group", id: groupId },
      ],
    }),

    // Delete a group
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),

    // Get group members
    getGroupMembers: builder.query({
      query: (groupId) => `/groups/${groupId}/members`,
      providesTags: (result, error, groupId) => [{ type: "Group", id: groupId }],
    }),

    // Join a group
    joinGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}/join`,
        method: "POST",
      }),
      invalidatesTags: (result, error, groupId) => [{ type: "Group", id: groupId }],
    }),

    // Leave a group
    leaveGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}/leave`,
        method: "POST",
      }),
      invalidatesTags: (result, error, groupId) => [{ type: "Group", id: groupId }],
    }),
  }),
});

export const {
  useGetAllGroupsQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupMembersQuery,
  useJoinGroupMutation,
  useLeaveGroupMutation,
} = groupApi;
