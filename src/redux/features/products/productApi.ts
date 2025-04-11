import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products'
        }),
        getProductById: builder.query({
            query: (id)=> `/products/${id}`,
        })
    })
})


// Exporting auto generated hooks
export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;