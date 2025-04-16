import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://car-store-assingment.vercel.app/api/v1',
    baseUrl: 'http://localhost:5000/api/v1',
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
    // First attempt the original query
    let result = await baseQuery(arg, api, extraOptions);

    // If unauthorized (401), try to refresh token
    if (result.error?.status === 401) {
        console.log('Attempting token refresh...');


        const refreshResult = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
            method: 'POST',
            credentials: 'include'
        })

        const data = await refreshResult.json();
        const token = data.data.accessToken;

        const user = (api.getState() as RootState).auth.user;

        api.dispatch(setUser({
            user,
            token
        }));

        // Retry the original query with new token
        result = await baseQuery(arg, api, extraOptions);
    }

    return result;
}



export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: customQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: ['Products', 'Users', 'Orders']
});