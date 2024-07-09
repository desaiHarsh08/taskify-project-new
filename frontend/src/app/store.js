import { configureStore } from '@reduxjs/toolkit'
import statsReducer from './features/statsSlice'
import fetchAgainReducer from './features/fetchAgainSlice'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
import loadingReducer from './features/loadingSlice'

export const store = configureStore({
    reducer: {
        stats: statsReducer,
        fetchAgain: fetchAgainReducer,
        auth: authReducer,
        user: userReducer,
        loading: loadingReducer,
    },
})