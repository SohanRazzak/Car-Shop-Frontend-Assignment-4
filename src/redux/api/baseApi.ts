import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";
import { TRefreshToken } from "../../types/auth.types";


const baseURL = import.meta.env.VITE_BASEURL

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers;
    }
})


const customQueryWithRefreshToken = async (
    arg: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
) => {
    let result = await baseQuery(arg, api, extraOptions);

    if (result.error?.status === 401) {
        console.log('token refresh...');

        const refreshResult = await baseQuery(
            {
                url: 'auth/refresh-token',
                method: 'POST',
                credentials: 'include'
            },
            api,
            extraOptions
        );
        console.log(refreshResult);

        if (refreshResult.data) {
            const token = (refreshResult.data as TRefreshToken).data.accessToken;

            const user = (api.getState() as RootState).auth.user;

            api.dispatch(setUser({
                user,
                token
            }));

            result = await baseQuery(arg, api, extraOptions);
        } else {
            // optionally handle refresh failure
            console.error('Refresh failed', refreshResult.error);
        }
    }

    return result;
};




export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: customQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: ['Products', 'Users', 'Orders']
});