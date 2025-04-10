import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    user: object | null;
    token: string | null;
}

const initialState: TAuthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            
        },
        logout: (state) => {
            state.user = null;
            state.token = null
        }
    }
})

// Exporting actions
export const { setUser, logout } = authSlice.actions;

// Exporting default reducers
export default authSlice.reducer;