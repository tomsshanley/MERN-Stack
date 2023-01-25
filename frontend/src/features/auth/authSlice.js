// This is where our reducers and our initial state
// that pertains to our initla authentication

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'

// when registering or loggin in you get back some data, importantly
// you get back a JSON web token (JWT) which is what you need to access
// protected routes. This JWT will be stored in local storage

// Get User from localStorage (parse to string as localstorage can onlyt have strings)
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null, // test if user in local storge, else set it to null
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login User

export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
}
)

// creating the actual slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reset is used to set initial values after registering a user
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    // for handling pending state, fullfullid state, and rejected state
    extraReducers: (builder) => {
        builder 
         .addCase(register.pending, (state) => {
            state.isLoading = true
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
         })
         .addCase(register.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
         })
         .addCase(login.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null
         })
    },
})

// when you have a reducer inside the authSlice function, you have to export it differently
export const {reset} = authSlice.actions

// general export
export default authSlice.reducer