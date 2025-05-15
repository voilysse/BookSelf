import { createApi, fetchBaseQuery} from'@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    credentials: 'include'
}),endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: 'api/profile',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserQuery } = authApi
