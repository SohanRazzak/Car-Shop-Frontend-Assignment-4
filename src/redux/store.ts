import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { baseApi } from "./api/baseApi";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persitsConfig  = {
    key: 'auth',
    storage,
}
const persistAuthReducer = persistReducer(persitsConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        [baseApi.reducerPath] : baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})


// Infering types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Exporting persistStore to wrap root component
export const persistor = persistStore(store);