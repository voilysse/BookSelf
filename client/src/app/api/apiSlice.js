import { createApi, fetchBaseQuery} from'@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '/../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    credentials: 'include',
    prepareHeaders: (headers, { getState })=>{
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})