import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct } from "../../../types/types";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<TProduct, void>({
            query: () => '/products'
        })
    })
})


// Exporting auto generated hooks
export const { useGetAllProductsQuery } = productApi;