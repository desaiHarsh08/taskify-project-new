import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token')===undefined ? 
        null : JSON.parse(localStorage.getItem('token')),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log("in authSlice, token:", action.payload);
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer