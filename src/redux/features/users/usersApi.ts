import { baseApi } from "../../api/baseApi";
import { TUser } from "../../../types/types"; // Make sure TUser is defined properly

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: ['Users']
        }),
        getUserById: builder.query<TUser, string>({
            query: (id) => `/users/${id}`,
        }),
        createUser: builder.mutation<void, Partial<TUser>>({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: builder.mutation<void, { id: string; body: Partial<TUser> }>({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users']
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;
