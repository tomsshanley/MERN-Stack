// This is where our reducers and our initial state
// that pertains to our initla authentication

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    extraReducers: () => {},
})

// when you have a reducer inside the authSlice function, you have to export it differently
export const {reset} = authSlice.actions

// general export
export default authSlice.reducer