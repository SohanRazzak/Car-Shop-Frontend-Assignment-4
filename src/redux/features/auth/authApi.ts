import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo
            })
        }),
        signup: builder.mutation({
            query: (newUserInfo) => ({
                url: '/users/create-user',
                method: 'POST',
                body: newUserInfo
            })
        }),
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: passwordData,
            }),
        }),
    })
})


export const { useLoginMutation, useSignupMutation, useChangePasswordMutation } = authApi;