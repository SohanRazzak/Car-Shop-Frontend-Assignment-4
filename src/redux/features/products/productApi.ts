import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct } from "../../../types/types";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['allProducts'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<TProduct, void>({
            query: () => '/products',
            providesTags: ['allProducts']
        }),
        getProductById: builder.query<TProduct, string>({
            query: (id)=> `/products/${id}`,
        })
    })
})


// Exporting auto generated hooks
export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;