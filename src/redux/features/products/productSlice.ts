import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/types";

type TInitialState = {
    products: TProduct[] | null,
    product: TProduct | null;
}

const initialState: TInitialState = {
    products: null,
    product: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

// Exporting actions
export const { setProducts } = productSlice.actions;

// Exporting product reducer for store
export default productSlice.reducer;