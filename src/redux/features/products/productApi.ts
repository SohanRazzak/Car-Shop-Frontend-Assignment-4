
import { TProduct } from "../../../types/types";
import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<TProduct, void>({
            query: () => '/products'
        }),
        getProductById: builder.query<TProduct, string>({
            query: (id)=> `/products/${id}`,
        })
    })
})


// Exporting auto generated hooks
export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;