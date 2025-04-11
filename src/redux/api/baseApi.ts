import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://car-store-assingment.vercel.app/api/v1',
        credentials: "include"
    }),
    endpoints: () => ({}),
    tagTypes: ['Products']
});