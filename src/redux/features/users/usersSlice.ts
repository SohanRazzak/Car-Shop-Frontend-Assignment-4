import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../types/types";

type TInitialState = {
    users: TUser[] | null
}

const initialState: TInitialState = {
    users: null
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
