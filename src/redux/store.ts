import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { baseApi } from "./api/baseApi";
import { PERSIST, persistReducer, persistStore, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from "./features/products/productSlice";
import usersReducer from "./features/users/usersSlice";
import ordersReducer from "./features/orders/orderSlice";


const authPersitsConfig = {
    key: 'auth',
    storage,
}
const persistAuthReducer = persistReducer(authPersitsConfig, authReducer)

const ordersPersitsConfig = {
    key: 'orders',
    storage,
}
const persistOrdersReducer = persistReducer(ordersPersitsConfig, ordersReducer)

export const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        users: usersReducer,
        product: productReducer,
        orders: persistOrdersReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [REHYDRATE, PERSIST, REGISTER]
        }
    }).concat(baseApi.middleware)
})


// Infering types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Exporting persistStore to wrap root component
export const persistor = persistStore(store);