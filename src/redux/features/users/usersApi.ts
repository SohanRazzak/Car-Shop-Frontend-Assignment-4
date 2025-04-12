import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users']
        }),
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),


        getMe: builder.query({
            query: () => "/auth/me",
        }),

        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']
        }),

        updateProfile: builder.mutation({
            query: (profileData) => ({
                url: "/users/update-profile",
                method: "PATCH",
                body: profileData,
            }),
            invalidatesTags: ['Users']
        }),


        blockUser: builder.mutation({
            query: ({ id, status }) => ({
                url: `/users/update-status/${id}`,
                method: 'PATCH',
                body: { status }
            }),
            invalidatesTags: ['Users']
        }),
        changeRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/users/update-role/${id}`,
                method: 'PATCH',
                body: { role }
            }),
            invalidatesTags: ['Users']
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateProfileMutation,
    useBlockUserMutation,
    useGetMeQuery,
    useChangeRoleMutation
} = userApi;
