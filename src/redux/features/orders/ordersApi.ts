

import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => "/orders/all-orders",
            providesTags: ['Orders']
        }),
        getOrderById: builder.query({
            query: (id) => `/orders/order/${id}`
        }),

        getMyOrders: builder.query({
            query: () => "/orders/my-orders",
            providesTags: ['Orders']
        }),


        updateOrderDeliveryStatus: builder.mutation({
            query: ({ id, deliveryStatus }) => ({
                url: `/orders/update-delivery-status/${id}`,
                method: "PATCH",
                body: { deliveryStatus },
            }),
            invalidatesTags: ["Orders"]
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/delete-order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"]
        }),

        checkoutOrders: builder.mutation({
            query: (products) => ({
                url: '/orders/create-order',
                method: "POST",
                body: { products }
            })
        }),

        verifyOrder: builder.query({
            query: (invoiceId) => `/orders/verify?orderId=${invoiceId}`,
        })
    })
})


export const { useGetOrdersQuery,
    useUpdateOrderDeliveryStatusMutation,
    useDeleteOrderMutation,
    useGetOrderByIdQuery,
    useCheckoutOrdersMutation,
    useGetMyOrdersQuery, useVerifyOrderQuery } = orderApi;