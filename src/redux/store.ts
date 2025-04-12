import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { baseApi } from "./api/baseApi";
import {PERSIST, persistReducer, persistStore, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from "./features/products/productSlice";
import usersReducer from "./features/users/usersSlice";


const persitsConfig  = {
    key: 'auth',
    storage,
}
const persistAuthReducer = persistReducer(persitsConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        users: usersReducer,
        product: productReducer,
        [baseApi.reducerPath] : baseApi.reducer
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