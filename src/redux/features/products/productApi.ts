import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products',
            providesTags: ['Products']
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/products',
                method: 'POST',
                body: newProduct
            })
        }),
        updateProduct: builder.mutation({
            query: ({ id, updatedProduct }) => ({
                url: `/products/${id}`,
                method: 'PATCH',
                updatedProduct,
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'delete',
            }),
            invalidatesTags: ["Products"]
        }),
    })
})


// Exporting auto generated hooks
export const { useGetAllProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation,
    useDeleteProductMutation
 } = productApi;