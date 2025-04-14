import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../types/types";

interface OrdersState {
    orders: TOrder[] | null;
}

const initialState: OrdersState = {
    orders: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        },

        deleteOrder: (state, action) => {
            state.orders = state.orders!.filter(order => order._id !== action.payload);
        },
    },
});

// Export actions
export const {
    setOrders,
    deleteOrder
} = ordersSlice.actions;



// Export reducer
export default ordersSlice.reducer;