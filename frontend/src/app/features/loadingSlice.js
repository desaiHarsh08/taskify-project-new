import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loadingState: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoadingState: (state, action) => {
            console.log("loading:", action.payload)
            state.loadingState = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoadingState } = loadingSlice.actions

export const selectLoadingState = (state) => state.loading.loadingState;

export default loadingSlice.reducer