import { configureStore, combineReducers,getDefaultMiddleware, } from '@reduxjs/toolkit'
import { authSlice } from './auth/authReducer'

const rootRaducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
})

export const store = configureStore({
    reducer: rootRaducer,
})