import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import { authApi } from "../features/auth/authApi"
import { userApi } from "../features/userApi"
import { bookApi } from "../features/bookApi"
import { groupApi } from "../features/groupsApi"
import { forumApi } from "../features/forumApi"
import { shelfApi } from "../features/shelfApi"

const store = configureStore({
    reducer: {
        auth: authSlice, 
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        [forumApi.reducerPath]: forumApi.reducer,
        [shelfApi.reducerPath]: shelfApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
     .concat(authApi.middleware)
     .concat(userApi.middleware)
     .concat(bookApi.middleware)
     .concat(groupApi.middleware)
     .concat(forumApi.middleware)
     .concat(shelfApi.middleware)
})

export default store