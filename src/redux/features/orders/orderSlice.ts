import { RootState } from './../../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../../types/types";

interface OrdersState {
    orders: TOrder[] | null;
    myCart: { productId: string, quantity: number }[]
}

const initialState: OrdersState = {
    orders: null,
    myCart: []
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
        setMyCart: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
            const { productId, quantity = 1 } = action.payload;
            const existingItem = state.myCart.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.myCart.push({
                    productId,
                    quantity
                });
            }
        },
        clearCart: (state)=>{
            state.myCart = []
        },
        removeCartItem: (state, action) => {
            state.myCart = state.myCart.filter(item => item.productId !== action.payload)
        }
    },
});

// Export actions
export const {
    setOrders,
    deleteOrder,
    setMyCart,
    clearCart,
    removeCartItem
} = ordersSlice.actions;


// Export selector
export const selectCartItems = (state: RootState) => state.orders.myCart


// Export reducer
export default ordersSlice.reducer;